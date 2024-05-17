import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { setLogout } from '../store/reducers/auth.reducer.ts';
import { refreshAccessToken, verifyRefreshToken } from '../services/auth.services.ts';

export const activateInterceptor = (dispatch: Dispatch): void => {

    let isRefreshing: boolean = false;

    // Add a request interceptor to modify config for all requests
    axios.interceptors.request.use(
        async (config) => {
            config.withCredentials = true;
            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    // Add a response interceptor to handle token refresh
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error: AxiosError) => {
            if (error.response && error.response.status === 401 && !isRefreshing) {
                console.log('Unauthorized. Attempting to refresh access token.');
                try {
                    isRefreshing = true;
                    // Verify the refresh token before attempting to refresh access token
                    const isRefreshTokenValid: boolean = await verifyRefreshToken(dispatch);
                    if (isRefreshTokenValid) {
                        // Refresh the access token
                        await refreshAccessToken();
                        // Retry the original request if error.config is defined
                        if (error.config) {
                            // Retry logic
                            let retryCount: number = 0;
                            while (retryCount < 5) {
                                retryCount++;
                                try {
                                    const response = await axios.request(error.config);
                                    return response;
                                } catch (retryError) {
                                    console.error('Retry failed:', retryError);
                                }
                            }
                            console.error('Retry limit exceeded');
                            return Promise.reject(error);
                        } else {
                            console.error('Original request config is undefined');
                            return Promise.reject(error);
                        }
                    } else {
                        // Logout user if refresh token is expired or invalid
                        dispatch(setLogout());
                        return Promise.reject(error);
                    }
                } catch (refreshError) {
                    console.error('Error refreshing access token:', refreshError);
                    // Logout user if token refresh fails
                    dispatch(setLogout());
                    return Promise.reject(error);
                } finally {
                    isRefreshing = false;
                }
            }

            // Return the error for other status codes
            return Promise.reject(error);
        }
    );
};

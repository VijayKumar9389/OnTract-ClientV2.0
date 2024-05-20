import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { Dispatch } from 'redux';
import { setLogout } from '../store/reducers/auth.reducer';
import { refreshAccessToken, verifyRefreshToken } from '../services/auth.services';

export const activateInterceptor = (dispatch: Dispatch): void => {
    let isRefreshing: boolean = false;
    let refreshSubscribers: ((token: string) => void)[] = [];

    const onAccessTokenFetched = (accessToken: string) => {
        refreshSubscribers.forEach(callback => callback(accessToken));
        refreshSubscribers = [];
    };

    const addRefreshSubscriber = (callback: (token: string) => void) => {
        refreshSubscribers.push(callback);
    };

    // Add a request interceptor to modify config for all requests
    axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token: string | null = localStorage.getItem('accessToken');

            if (token) {
                config.headers = config.headers || {};
                config.headers['accessToken'] = token;
            }
            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    // Add a response interceptor to handle token refresh
    axios.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve) => {
                        addRefreshSubscriber((token: string) => {
                            originalRequest.headers['accessToken'] = token;
                            resolve(axios(originalRequest));
                        });
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    console.log('Unauthorized. Attempting to refresh access token.');

                    // Verify the refresh token before attempting to refresh access token
                    const isRefreshTokenValid: boolean = await verifyRefreshToken(dispatch);

                    if (isRefreshTokenValid) {
                        // Refresh the access token
                        const newAccessToken = await refreshAccessToken();

                        if (newAccessToken) {
                            onAccessTokenFetched(newAccessToken);
                            originalRequest.headers['accessToken'] = newAccessToken;
                            return axios(originalRequest);
                        } else {
                            throw new Error('Failed to refresh access token');
                        }
                    } else {
                        dispatch(setLogout());
                    }
                } catch (refreshError) {
                    console.error('Error refreshing access token:', refreshError);
                    dispatch(setLogout());
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
};

// Function to activate the Axios interceptors for handling token refresh
import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {setLogout} from "../store/reducers/auth.reducer.ts";
import {refreshAccessToken, verifyRefreshToken} from "../services/auth.services.ts";

export const activateInterceptor = (dispatch: Dispatch): void => {
    // Define a variable to track whether a token refresh is in progress
    let isRefreshing = false;

    // Add a request interceptor to modify config for all requests
    axios.interceptors.request.use(
        async (config) => {
            // Modify config to include withCredentials for all requests
            config.withCredentials = true;
            return config;
        },
        (error: AxiosError) => {
            // Handle request error
            return Promise.reject(error);
        }
    );

    // Add a response interceptor to handle token refresh
    axios.interceptors.response.use(
        (response) => {
            // If the response is successful, return it
            return response;
        },
        async (error: AxiosError) => {
            // If the response status is 401 and token is not currently being refreshed, attempt to refresh the token
            if (error.response && error.response.status === 401 && !isRefreshing) {
                console.log('Unauthorized. Attempting to refresh access token.');
                try {
                    isRefreshing = true;
                    // Refresh the access token
                    await refreshAccessToken();
                    // Verify the refreshed token
                    await verifyRefreshToken(dispatch);
                    isRefreshing = false;
                    // Retry the original request if error.config is defined
                    if (error.config) {
                        return axios.request(error.config);
                    } else {
                        console.error('Original request config is undefined');
                        return Promise.reject(error);
                    }
                } catch (refreshError) {
                    isRefreshing = false;
                    console.error('Error refreshing access token:', refreshError);
                    // Logout user if token refresh fails
                    dispatch(setLogout());
                    return Promise.reject(error);
                }
            }

            // Return the error for other status codes
            return Promise.reject(error);
        }
    );
};
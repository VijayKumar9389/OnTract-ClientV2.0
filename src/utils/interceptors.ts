import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { refreshAccessToken } from '../services/auth.services';
import { Dispatch } from 'redux';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retryCount?: number;
}

// Function to activate the interceptors
export const activateInterceptor = (dispatch: Dispatch): void => {
    // Maximum retry attempts
    const MAX_RETRY_ATTEMPTS: number = 5;

    // Request interceptor
    axios.interceptors.request.use(
        async (config) => {
            config.withCredentials = true; // Ensure cookies are sent

            const accessToken: string | null = localStorage.getItem('accessToken');
            if (accessToken) {
                config.headers['accessToken'] = accessToken; // Attach access token to headers
            }

            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error: AxiosError) => {
            const originalRequest = error.config as CustomAxiosRequestConfig;

            // If the response status is 401 (Unauthorized)
            if (error.response && error.response.status === 401) {
                console.log('Unauthorized. Attempting to refresh access token.');

                // Initialize or increment the retry count
                originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

                // Check if we have not exceeded the maximum retry attempts
                if (originalRequest._retryCount <= MAX_RETRY_ATTEMPTS) {
                    try {
                        // Refresh the access token
                        await refreshAccessToken(dispatch);

                        // Retry the original request
                        return axios.request(originalRequest);
                    } catch (refreshError) {
                        console.error('Error refreshing access token:', refreshError);
                    }
                } else {
                    console.error('Maximum retry attempts reached');
                }
            }

            return Promise.reject(error);
        }
    );
}

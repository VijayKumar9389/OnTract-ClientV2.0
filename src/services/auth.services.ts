import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import {setAdminStatus, setLogin, setLogout} from "../store/reducers/auth.reducer.ts";
import { TokenResponse } from "../models/auth.models.ts";

// Refresh the access token
export const refreshAccessToken = async (): Promise<boolean> => {
    try {
        const response = await axios.post<TokenResponse>('http://localhost:3005/user/refresh-token', {}, {
            withCredentials: true,
        });

        console.log(response)

        // Return the refreshed access token
        return true;
    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
    }
};

// Handle the login process
export const handleLogin = async (username: string, password: string, dispatch: Dispatch): Promise<void> => {
    try {
        const response = await axios.post<TokenResponse>('http://localhost:3005/user/login', { username, password }, {
            withCredentials: true,
        });

        // Dispatch login action with token response
        dispatch(setLogin(response.data));
    } catch (error) {
        console.error('Login failed:', error);
        // Handle login error
    }
};

// Client-side code to verify user session using refresh token
export const verifyRefreshToken = async (dispatch: Dispatch): Promise<boolean> => {
    try {
        const response = await axios.post<{auth: boolean, user: string}>('http://localhost:3005/user/verify-token', {}, {
            withCredentials: true,
        });

        // Dispatch login action with user data from response
        dispatch(setLogin(response.data));

        // Return true indicating successful verification
        return true;
    } catch (error) {
        console.error('Verification failed:', error);
        dispatch(setLogout());
        return false;
    }
};

// Function to activate the Axios interceptors for handling token refresh
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


// Function to check user's admin status
export const checkAdminStatus = async (dispatch: Dispatch): Promise<void> => {
    try {
        const response = await axios.get<{ isAdmin: boolean }>('http://localhost:3005/user/admin-status', {
            withCredentials: true,
        });

        // Dispatch action based on admin status
        dispatch(setAdminStatus(response.data.isAdmin));
    } catch (error) {
        console.error('Failed to check admin status:', error);
        // Handle error
    }
};
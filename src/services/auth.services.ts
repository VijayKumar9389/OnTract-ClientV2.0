import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import {setLogin, setLogout} from "../store/reducers/auth.reducer.ts";
import { TokenResponse} from "../models/auth.models.ts";

// Refresh the access token
export const refreshAccessToken = async (): Promise<string> => {
    try {
        // Make a POST request to the server to refresh the token
        const response: Response = await fetch('http://localhost:3005/user/refresh-token', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response status is not ok
        if (!response.ok) {
            console.error('Token refresh failed:', response.statusText);
            throw new Error('Token refresh failed');
        }

        // Parse the response and return the access token
        const data: TokenResponse = await response.json();
        console.log('Refreshed access token:', data.accessToken);
        return data.accessToken;

    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
    }
};

// Handle the login process
export const handleLogin = async (username: string, password: string, dispatch: Dispatch): Promise<void> => {
    try {
        // Make a POST request to the server to log in the user
        const response: Response = await fetch('http://localhost:3005/user/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        // If the request was not successful, throw an error
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        // If the request was successful, extract user information from the response
        const data: TokenResponse = await response.json();
        dispatch(setLogin(data));
    } catch (error) {
        console.error('Login failed:', error);
        // Handle login error, e.g., display an error message to the user
    }
};

// Verify the refresh token
export const verifyRefreshToken = async (dispatch: Dispatch): Promise<boolean> => {
    try {
        // Make a POST request to the server to verify the token
        const response: Response = await fetch('http://localhost:3005/user/verify-token', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // If the request was not successful, dispatch a logout action and return false
        if (!response.ok) {
            dispatch(setLogout());
            return false;
        }

        // If the request was successful, refresh the access token and return true
        await refreshAccessToken();
        console.log(response.body)
        return true;
    } catch (error) {
        console.error('Verification failed:', error);
        return false;
    }
};

export const activateInterceptor = (dispatch: Dispatch): void => {
    // Define a variable to track whether a token refresh is in progress
    let isRefreshing = false;

    // Add a request interceptor
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

    // Add a response interceptor
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
                    await verifyRefreshToken(dispatch);
                    isRefreshing = false;
                    return Promise.reject(error);
                } catch (refreshError) {
                    isRefreshing = false;
                    console.error('Error refreshing access token:', refreshError);
                    dispatch(setLogout());
                    return Promise.reject(error);
                }
            }

            // Return the error for other status codes
            return Promise.reject(error);
        }
    );
};

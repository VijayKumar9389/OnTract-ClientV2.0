import axios from 'axios';
import {AuthResponse, TokenResponse} from '../models/auth.models';
import {Dispatch} from "redux";
import {setLogout} from "../store/reducers/auth.reducer.ts";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

// Refresh the access token
export const refreshAccessToken = async (dispatch: Dispatch): Promise<boolean> => {
    try {
        // Get the refresh token from local storage
        const refreshToken: string | null = localStorage.getItem('refreshToken');

        // If no refresh token is found, log an error and return false
        if (!refreshToken) {
            console.error('No refresh token found trying to refresh the access token');
            return false;
        }

        // Refresh the access token
        const response = await axios.post<TokenResponse>(`${API_BASE_URL}/user/refresh-token`,
            {},
            {
                headers: {
                    refreshToken: refreshToken
                },
                withCredentials: true, // Ensure cookies are sent
            }
        );

        // Update the access token in local storage
        const {accessToken} = response.data;
        localStorage.setItem('accessToken', accessToken);
        return true;
    } catch (error) {
        console.error('Token refresh failed:', error);
        dispatch(setLogout())
        throw error
    }
};

// Verify the refresh token
export const verifyRefreshToken = async (): Promise<AuthResponse> => {
    try {
        // Get the refresh token from local storage
        const refreshToken: string | null = localStorage.getItem('refreshToken');

        // If no refresh token is found, log an error and return false
        if (!refreshToken) {
            console.error('No refresh token found while trying to verify token');
            return {auth: false, user: ''};
        }

        // Verify the refresh token
        const response = await axios.post<{ auth: boolean, user: string }>(
            `${API_BASE_URL}/user/verify-token`,
            {},
            {
                headers: {
                    refreshToken: refreshToken
                },
                withCredentials: true, // Ensure cookies are sent
            }
        );

        return response.data;
    } catch (error) {
        console.error('Verification failed:', error);
        throw error;
    }
};

// Function to check user's admin status
export const checkAdminStatus = async (): Promise<boolean> => {
    try {
        const endpoint: string = `${API_BASE_URL}/user/admin-status`;

        // Get the refresh token from local storage
        const refreshToken: string | null = localStorage.getItem('refreshToken');

        // If no refresh token is found, log an error
        if (!refreshToken) {
            console.error('No refresh token found while checking admin status');
            return false;
        }

        // Send a POST request with the refresh token in the body
        const response = await axios.post<{ auth: boolean }>(endpoint,
            {},
            {
                headers: {
                    refreshToken: refreshToken
                },
                withCredentials: true,
            }
        );

        // Dispatch action based on admin status
        return response.data.auth;
    } catch (error) {
        console.error('Failed to check admin status:', error);
        return false;
    }
};
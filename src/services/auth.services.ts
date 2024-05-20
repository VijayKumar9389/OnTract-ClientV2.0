import axios from 'axios';
import {Dispatch} from 'redux';
import {setLogout} from '../store/reducers/auth.reducer';
import {TokenResponse} from '../models/auth.models';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Refresh the access token
export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        // Get the refresh token from local storage
        const refreshToken: string | null = localStorage.getItem('refreshToken');

        // If no refresh token is found, log an error and return false
        if (!refreshToken) {
            console.error('No refresh token found');
        }

        // Refresh the access token
        const response = await axios.post<TokenResponse>(`${API_BASE_URL}/user/refresh-token`,
            {refreshToken},
            {withCredentials: true}
        );

        const {accessToken} = response.data;
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
    } catch (error) {
        console.error('Token refresh failed:', error);
        return null;
    }
};

// Verify refresh token
export const verifyRefreshToken = async (dispatch: Dispatch): Promise<boolean> => {
    try {
        // Get the refresh token from local storage
        const refreshToken: string | null = localStorage.getItem('refreshToken');

        // If no refresh token is found, log an error and return false
        if (!refreshToken) {
            console.error('No refresh token found');
            return false;
        }

        // Verify the refresh token
        const response = await axios.post<{ auth: boolean, user: string, accessToken: string, refreshToken: string }>(
            `${API_BASE_URL}/user/verify-token`,
            {refreshToken}, // Include refreshToken in the request body
            {
                withCredentials: true,
            }
        );

        const {auth} = response.data;
        return auth;
    } catch (error) {
        console.error('Verification failed:', error);
        dispatch(setLogout());
        return false;
    }
};

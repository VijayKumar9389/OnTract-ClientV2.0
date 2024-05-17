import axios from 'axios';
import { Dispatch } from 'redux';
import { setLogin, setLogout } from "../store/reducers/auth.reducer";
import { TokenResponse } from "../models/auth.models";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log(API_BASE_URL);

// Refresh the access token
export const refreshAccessToken = async (): Promise<boolean> => {
    try {
        // Send a POST request to refresh the access token
        const response = await axios.post<TokenResponse>(`${API_BASE_URL}/user/refresh-token`, {}, {
            withCredentials: true,
        });

        console.log(response);

        // Return the refreshed access token
        return true;
    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
    }
};

// Client-side code to verify user session using refresh token
export const verifyRefreshToken = async (dispatch: Dispatch): Promise<boolean> => {
    try {
        // Send a POST request to verify the refresh token
        const response = await axios.post<{ auth: boolean, user: string }>(`${API_BASE_URL}/user/verify-token`, {}, {
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

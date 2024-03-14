import axios from 'axios';
import {Dispatch} from 'redux';
import {setLogin, setLogout} from "../store/reducers/auth.reducer.ts";
import {TokenResponse} from "../models/auth.models.ts";

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



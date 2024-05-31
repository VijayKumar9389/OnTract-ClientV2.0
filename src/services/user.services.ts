import axios, {AxiosResponse} from "axios";
import {TokenResponse, User} from "../models/auth.models.ts";
import {Dispatch} from "redux";
import {setLogin} from "../store/reducers/auth.reducer.ts";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

// Get all users
export const getUsers = async (): Promise<User[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/user/getAll`;
        const response: AxiosResponse<User[]> = await axios.get<User[]>(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
};

// Handle the login process
export const handleLogin = async (username: string, password: string, dispatch: Dispatch): Promise<void> => {
    try {
        // Define the login endpoint
        const endpoint: string = `${API_BASE_URL}/user/login`;

        // Make a POST request to the login endpoint
        const response = await axios.post<TokenResponse>(endpoint, { username, password }, {
            withCredentials: true,
        });

        //  Extract the tokens from the response
        const { accessToken, refreshToken } = response.data;

        // Check if tokens are present in the response
        if (!accessToken || !refreshToken) {
            throw new Error('Tokens not found in response');
        }

        // Store tokens in local storage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // Dispatch login action with token response
        dispatch(setLogin(response.data));
        window.location.reload();

    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios errors
            console.error('Axios error:', error.message, error.response?.data);
        } else {
            // Handle generic errors
            console.error('Login failed:', error);
        }
    }
};

// Register a new user
export const registerUser = async (username: string, password: string): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/user/register`;
        await axios.post(endpoint, { username, password });
    } catch (error) {
        console.error('Failed to register user:', error);
    }
}

// Edit a user
export const editUser = async (id: number, username: string, password: string): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/user/edit`;
        await axios.post(endpoint, { id, username, password });
    } catch (error) {
        console.error('Failed to edit user:', error);
    }
}


import axios, { AxiosResponse } from "axios";
import { TokenResponse, User } from "../models/auth.models.ts";
import { Dispatch } from "redux";
import { setAdminStatus, setLogin } from "../store/reducers/auth.reducer.ts";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

console.log("API_BASE_URL:", API_BASE_URL); // For debugging purposes

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
        const endpoint: string = `${API_BASE_URL}/user/login`;
        const response = await axios.post<TokenResponse>(endpoint, { username, password }, {
            withCredentials: true,
        });
        // Dispatch login action with token response
        dispatch(setLogin(response.data));
    } catch (error) {
        console.error('Login failed:', error);
        // Handle login error
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

// Function to check user's admin status
export const checkAdminStatus = async (dispatch: Dispatch): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/user/admin-status`;
        const response = await axios.get<{ isAdmin: boolean }>(endpoint, {
            withCredentials: true,
        });

        // Dispatch action based on admin status
        dispatch(setAdminStatus(response.data.isAdmin));
    } catch (error) {
        console.error('Failed to check admin status:', error);
        // Handle error
    }
};

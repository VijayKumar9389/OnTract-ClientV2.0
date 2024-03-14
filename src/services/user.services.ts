import axios, {AxiosResponse} from "axios";
import {TokenResponse, User} from "../models/auth.models.ts";
import {Dispatch} from "redux";
import {setAdminStatus, setLogin} from "../store/reducers/auth.reducer.ts";

// Get all users
export const getUsers = async (): Promise<User[]> => {
    try {
        const endpoint: string = `http://localhost:3005/user/getAll`;
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
        const response = await axios.post<TokenResponse>('http://localhost:3005/user/login', {username, password}, {
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
        await axios.post('http://localhost:3005/user/register', {username , password});
    } catch (error) {
        console.error('Failed to register user:', error);
    }
}

// Edit a user
export const editUser = async (id: number, username: string, password: string): Promise<void> => {
    try {
        await axios.post('http://localhost:3005/user/edit', {id, username, password});
    } catch (error) {
        console.error('Failed to edit user:', error);
    }
}

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
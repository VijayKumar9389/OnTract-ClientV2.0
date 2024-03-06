import axios, { AxiosResponse } from "axios";
import { User } from "../models/auth.models.ts";

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

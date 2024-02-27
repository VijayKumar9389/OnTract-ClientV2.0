import {Item, NewItemInput} from "../models/item.models.ts";
import axios, {AxiosResponse} from "axios";


// Get all items by project ID
export const getItemsByProjectId = async (projectId: number): Promise<Item[]> => {
    try {
        const endpoint: string = `http://localhost:3005/item/getall/${projectId}`;
        const response: AxiosResponse<Item[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting items:', error);
        throw error;
    }
}


export const createItem = async (formData: NewItemInput): Promise<Item> => {
    try {
        const endpoint: string = `http://localhost:3005/item/create`;
        const response: AxiosResponse<Item> = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
}
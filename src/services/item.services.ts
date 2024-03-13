import {Item, NewItemInput, NewPackageItem, PackageItem} from "../models/item.models.ts";
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

// Get item by ID
export const getItemById = async (itemId: number): Promise<Item> => {
    try {
        const endpoint: string = `http://localhost:3005/item/get/${itemId}`;
        const response: AxiosResponse<Item> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting item:', error);
        throw error;
    }
}

// Create a new item
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

// Delete item by ID
export const createPackageItem = async (PackageItemData: NewPackageItem): Promise<PackageItem> => {
    try {
        const endpoint: string = `http://localhost:3005/item/createpackageitem`;
        const response: AxiosResponse<PackageItem> = await axios.post(endpoint, PackageItemData);
        return response.data;
    } catch (error) {
        console.error('Error creating package item:', error);
        throw error;
    }
}


// Delete an item
export const deleteItem = async (itemId: number): Promise<void> => {
    try {
        const endpoint: string = `http://localhost:3005/item/delete/${itemId}`;
        await axios.delete(endpoint);
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}

// Delete an package item
export const deletePackageItem = async (packageItemId: number): Promise<void> => {
    try {
        const endpoint: string = `http://localhost:3005/item/packageItem/delete/${packageItemId}`;
        await axios.delete(endpoint);
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}
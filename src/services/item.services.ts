import { Item, NewItemInput, NewPackageItem, PackageItem, UpdateItemInput } from "../models/item.models";
import axios, { AxiosResponse } from "axios";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

// Get all items by project ID
export const getItemsByProjectId = async (projectId: number): Promise<Item[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item/getall/${projectId}`;
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
        const endpoint: string = `${API_BASE_URL}/item/get/${itemId}`;
        const response: AxiosResponse<Item> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting item:', error);
        throw error;
    }
}

// Update an item by ID
export const updateItem = async (itemId: number, formData: UpdateItemInput): Promise<Item> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item/update/${itemId}`;
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const response: AxiosResponse<Item> = await axios.put(endpoint, formData, config);
        return response.data;
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
}

// Create a new item
export const createItem = async (formData: NewItemInput): Promise<Item> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item/create`;
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

// Create package item
export const createPackageItem = async (PackageItemData: NewPackageItem): Promise<PackageItem> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item/createpackageitem`;
        const response: AxiosResponse<PackageItem> = await axios.post(endpoint, PackageItemData);
        return response.data;
    } catch (error) {
        console.error('Error creating package item:', error);
        throw error;
    }
}

// Delete an item by ID if it isn't associated with a package
export const deleteItem = async (itemId: number): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item/delete/${itemId}`;
        await axios.delete(endpoint);
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}

// Delete a package item by ID
export const deletePackageItem = async (packageItemId: number): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item/packageItem/delete/${packageItemId}`;
        await axios.delete(endpoint);
    } catch (error) {
        console.error('Error deleting package item:', error);
        throw error;
    }
}

// Update package item quantity by ID
export const updatePackageItemQuantity = async (packageItemId: number, newQuantity: number): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/item/packageItem/update/${packageItemId}`;
        await axios.put(endpoint, { quantity: newQuantity });
    } catch (error) {
        console.error('Error updating package item quantity:', error);
        throw error;
    }
}

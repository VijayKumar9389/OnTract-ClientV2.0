import axios, { AxiosResponse } from "axios";
import { NewPackageInput, NewPackageTypeInput, Package, PackageType } from "../models/package.models.ts";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

// Cancel package
export const cancelPackage = async (packageId: number, stakeholderId: number): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/package/cancel/package/${packageId}/${stakeholderId}`;
        await axios.delete(endpoint);
    } catch (error) {
        console.error('Error canceling package:', error);
        throw error;
    }
}

// Delete PackageTypeGrid Type if there are no items associated with it
export const deletePackageType = async (packageTypeId: number): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/package/delete/packagetype/${packageTypeId}`;
        await axios.delete(endpoint);
    } catch (error) {
        console.error('Error deleting package type:', error);
        throw error;
    }
}

// Get all package types by project ID
export const getPackageTypesByProjectId = async (projectId: number): Promise<PackageType[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/package/get/packagetype/${projectId}`;
        const response: AxiosResponse<PackageType[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting package types:', error);
        throw error;
    }
}

// Get packages by package type ID
export const getPackageTypeById = async (packageTypeId: number): Promise<PackageType> => {
    try {
        const endpoint: string = `${API_BASE_URL}/package/get/packagetypebyid/${packageTypeId}`;
        const response: AxiosResponse<PackageType> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting package type by ID:', error);
        throw error;
    }
}

// Create package for existing delivery
export const createPackageForExistingDelivery = async (packageData: NewPackageInput): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/package/create/packageforexistingdelivery`;
        await axios.post(endpoint, packageData);
    } catch (error) {
        console.error('Error creating package for existing delivery:', error);
        throw error;
    }
}

// Create PackageTypeGrid Type
export const createPackageType = async (packageTypeData: NewPackageTypeInput, projectId: number): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/package/create/packagetype/${projectId}`;
        const response: AxiosResponse<void> = await axios.post(endpoint, packageTypeData);
        return response.data;
    } catch (error) {
        console.error('Error creating package type:', error);
        throw error;
    }
}

// Update PackageTypeGrid Type
export const updatePackageType = async (packageTypeId: number, packageTypeData: NewPackageTypeInput): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/package/update/packagetype/${packageTypeId}`;
        await axios.put(endpoint, packageTypeData);
    } catch (error) {
        console.error('Error updating package type:', error);
        throw error;
    }
}

// Get all packages by item ID
export const getPackageByPackageItemId = async (packageItemId: number): Promise<Package[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/package/get/packagebypackageitemid/${packageItemId}`;
        const response: AxiosResponse<Package[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting package by package item ID:', error);
        throw error;
    }
}

// Get packages by package type ID
export const getPackageByPackageTypeId = async (packageTypeId: number): Promise<Package[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/package/get/packagebypackagetypeid/${packageTypeId}`;
        const response: AxiosResponse<Package[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting package by package type ID:', error);
        throw error;
    }
}

// Change PackageTypeGrid's PackageTypeGrid Type
export const changePackagePackageType = async (packageId: number, packageTypeId: number): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/package/change/packagepackagetype/${packageId}/${packageTypeId}`;
        await axios.put(endpoint);
    } catch (error) {
        console.error('Error changing package package type:', error);
        throw error;
    }
}

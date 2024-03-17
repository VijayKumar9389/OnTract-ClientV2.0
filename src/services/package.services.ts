import axios, {AxiosResponse} from "axios";
import {NewPackageInput, NewPackageTypeInput, Package, PackageType} from "../models/package.models.ts";

//Cancel package
export const cancelPackage = async (packageId: number, stakeholderId: number): Promise<void> => {
    try {
        const endpoint: string = `http://localhost:3005/package/cancel/package/${packageId}/${stakeholderId}`;
        await axios.delete(endpoint);
    } catch (error) {
        console.error('Error canceling package:', error);
        throw error;
    }
}

// Delete Package Type if there are no items associated with it
export const deletePackageType = async (packageTypeId: number): Promise<void> => {
    try {
        const endpoint: string = `http://localhost:3005/package/delete/packagetype/${packageTypeId}`;
        await axios.delete(endpoint);
    } catch (error) {
        console.error('Error deleting package type:', error);
        throw error;
    }
}

// Get all package types by project ID
export const getPackageTypesByProjectId = async (projectId: number): Promise<PackageType[]> => {
    try {
        const endpoint: string = `http://localhost:3005/package/get/packagetype/${projectId}`;
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
        const endpoint: string = `http://localhost:3005/package/get/packagetypebyid/${packageTypeId}`;
        const response: AxiosResponse<PackageType> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting package type by ID:', error);
        throw error;
    }
}

//Create package for existing delivery
export const createPackageForExistingDelivery = async (packageData: NewPackageInput): Promise<void> => {
    try {
        const endpoint: string = `http://localhost:3005/package/create/packageforexistingdelivery`;
        await axios.post(endpoint, packageData);
    } catch (error) {
        console.error('Error creating package for existing delivery:', error);
        throw error;
    }
}

// Create Package Type
export const createPackageType = async (packageTypeData: NewPackageTypeInput, projectId: number): Promise<void> => {
    try {
        const endpoint: string = `http://localhost:3005/package/create/packagetype/${projectId}`;
        const response: AxiosResponse<void> = await axios.post(endpoint, packageTypeData);
        return response.data;
    } catch (error) {
        console.error('Error creating package type:', error);
        throw error;
    }
}

// Update Package Type
export const updatePackageType = async (packageTypeId: number, packageTypeData: NewPackageTypeInput): Promise<void> => {
    try {
        const endpoint: string = `http://localhost:3005/package/update/packagetype/${packageTypeId}`;
        await axios.put(endpoint, packageTypeData);
    } catch (error) {
        console.error('Error updating package type:', error);
        throw error;
    }
}


// get all packages by item ID
export const getPackageByPackageItemId = async (packageItemId: number): Promise<Package[]> => {
    try {
        const endpoint: string = `http://localhost:3005/package/get/packagebypackageitemid/${packageItemId}`;
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
        const endpoint: string = `http://localhost:3005/package/get/packagebypackagetypeid/${packageTypeId}`;
        const response: AxiosResponse<Package[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting package by package type ID:', error);
        throw error;
    }
}
import axios, {AxiosResponse} from "axios";
import {NewPackageInput, PackageType} from "../models/package.models.ts";

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
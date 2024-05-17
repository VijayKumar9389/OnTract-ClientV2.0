import { Delivery, DeliveryReportDTO, UpdateDeliveryInput, NewDeliveryInput } from "../models/delivery.models.ts";
import axios, { AxiosResponse } from "axios";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

// Get all deliveries by project ID
export const getDeliveriesByProjectID = async (projectId: number): Promise<Delivery[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/delivery/getbyproject/${projectId}`;
        const response: AxiosResponse<Delivery[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting delivery:', error);
        throw error;
    }
}

// Get Delivery By ID number
export const getDeliveryById = async (deliveryId: number): Promise<Delivery> => {
    try {
        const endpoint: string = `${API_BASE_URL}/delivery/getbyid/${deliveryId}`;
        const response: AxiosResponse<Delivery> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting deliveries:', error);
        throw error;
    }
}

// Get delivery by matching package ID
export const getDeliveryByPackageId = async (packageId: number): Promise<Delivery> => {
    try {
        const endpoint: string = `${API_BASE_URL}/delivery/getbypackage/${packageId}`;
        const response: AxiosResponse<Delivery> = await axios.get(endpoint, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error getting deliveries:', error);
        throw error;
    }
}

// Create delivery
export const createDelivery = async (delivery: NewDeliveryInput): Promise<Delivery> => {
    try {
        const endpoint: string = `${API_BASE_URL}/delivery/create/delivery`;
        const response: AxiosResponse<Delivery> = await axios.post(endpoint, delivery, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error creating delivery:', error);
        throw error;
    }
}

// Get delivery Report by project ID
export const getDeliveryReport = async (projectId: number): Promise<DeliveryReportDTO> => {
    try {
        const endpoint: string = `${API_BASE_URL}/delivery/report/${projectId}`;
        const response: AxiosResponse<DeliveryReportDTO> = await axios.get(endpoint, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error getting delivery report:', error);
        throw error;
    }
}

// Edit Delivery
export const editDelivery = async (deliveryId: number, delivery: UpdateDeliveryInput): Promise<Delivery> => {
    try {
        const endpoint: string = `${API_BASE_URL}/delivery/update/${deliveryId}`;
        const response: AxiosResponse<Delivery> = await axios.put(endpoint, delivery, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error updating delivery:', error);
        throw error;
    }
}

// Set completed status and date for delivery
export const setDeliveryCompleted = async (deliveryId: number, date: string): Promise<Delivery> => {
    try {
        const endpoint: string = `${API_BASE_URL}/delivery/complete/${deliveryId}`;
        const response: AxiosResponse<Delivery> = await axios.put(endpoint, { date }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error setting delivery completed:', error);
        throw error;
    }
}

// Cancel delivery by ID
export const cancelDeliveryById = async (deliveryId: number): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/delivery/cancel/${deliveryId}`;
        await axios.delete(endpoint, { withCredentials: true });
    } catch (error) {
        console.error('Error canceling delivery:', error);
        throw error;
    }
}

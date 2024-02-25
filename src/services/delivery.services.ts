import {Delivery} from "../models/delivery.models.ts";
import axios, {AxiosResponse} from "axios";

//Get all deliveries by project ID
export const GetDeliveriesByProjectID = async (projectId: number): Promise<Delivery[]> => {
    try {
        const endpoint: string = `http://localhost:3005/delivery/getbyproject/${projectId}`;
        const response: AxiosResponse<Delivery[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting delivery:', error);
        throw error;
    }
}
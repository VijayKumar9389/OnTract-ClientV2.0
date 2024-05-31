import axios, { AxiosResponse } from 'axios';
import {
    RelatedStakeholder,
    Stakeholder,
    UpdateStakeholderInput
} from "../models/stakeholder.models.ts";
import { UpdateTrackRecordInput } from "../models/stakeholder.models.ts";
import { StakeholderStatsDTO } from "../models/report.model.ts";

interface Location {
    province: string;
    count: number;
    cities: City[];
}

interface City {
    name: string;
    count: number;
}

export interface LocationData {
    locations: Location[];
}

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

export const getStakeholdersByProjectId = async (projectId: number): Promise<Stakeholder[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/stakeholder/getStakeholdersByProjectId/${projectId}`;
        const response: AxiosResponse<Stakeholder[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting stakeholders:', error);
        throw error;
    }
};

// Get statistics for stakeholders regarding a project
export const getStakeholderReport = async (projectId: number): Promise<StakeholderStatsDTO> => {
    try {
        const endpoint: string = `${API_BASE_URL}/stakeholder/getStakeholdersContactSummaryByProjectId/${projectId}`;
        const response: AxiosResponse<StakeholderStatsDTO> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting stakeholder summary:', error);
        throw error;
    }
}

export const getRelatedStakeholder = async (stakeholderId: number): Promise<RelatedStakeholder[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/stakeholder/getRelatedStakeholders/${stakeholderId}`;
        const response: AxiosResponse<RelatedStakeholder[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting stakeholders:', error);
        throw error;
    }
}

export const getLocationReport = async (projectId: number): Promise<LocationData[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/stakeholder/getLocations/${projectId}`;
        const response: AxiosResponse<LocationData[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting locations:', error);
        throw error;
    }
}

// Get stakeholder by ID
export const getStakeholderById = async (stakeholderId: number): Promise<Stakeholder> => {
    try {
        const endpoint: string = `${API_BASE_URL}/stakeholder/getStakeholdersById/${stakeholderId}`;
        const response: AxiosResponse<Stakeholder> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting stakeholder:', error);
        throw error;
    }
}

// Get stakeholder by tract number
export const getStakeholdersByTractNo = async (projectId: number, tractNo: number): Promise<Stakeholder[]> => {
    try {
        const endpoint: string = `${API_BASE_URL}/tract-record/get/${projectId}/${tractNo}`;
        const response: AxiosResponse<Stakeholder[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting stakeholders:', error);
        throw error;
    }
}

// Update stakeholder record
export const updateTractRecord = async (tractId: number, updatedTractRecord: UpdateTrackRecordInput): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/tract-record/update/${tractId}`;
        await axios.put(endpoint, updatedTractRecord);
    } catch (error) {
        console.error('Error updating tract record:', error);
        throw error;
    }
}

// Update stakeholder info by ID
export const updateStakeholder = async (stakeholderId: number, data: UpdateStakeholderInput): Promise<void> => {
    try {
        const endpoint: string = `${API_BASE_URL}/stakeholder/update/${stakeholderId}`;
        await axios.post<void>(endpoint, data);
    } catch (error) {
        console.error('Error updating stakeholder:', error);
        throw error;
    }
}

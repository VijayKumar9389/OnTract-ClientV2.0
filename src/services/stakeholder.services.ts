import axios, { AxiosResponse } from 'axios';
import {Stakeholder, StakeholderStatsDTO} from "../models/stakeholder.models.ts";

export const getStakeholdersByProjectId = async (projectId: number): Promise<Stakeholder[]> => {
    try {
        const endpoint: string = `http://localhost:3005/stakeholder/getStakeholdersByProjectId/${projectId}`;
        const response: AxiosResponse<Stakeholder[]> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting stakeholders:', error);
        throw error;
    }
};

export const getStakeholdersContactSummaryByProjectId = async (projectId: number) : Promise<StakeholderStatsDTO> => {
    try {
        const endpoint: string = `http://localhost:3005/stakeholder/getStakeholdersContactSummaryByProjectId/${projectId}`;
        const response: AxiosResponse<StakeholderStatsDTO> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting stakeholder summary:', error);
        throw error;
    }
}

// Get stakeholder by ID
export const getStakeholderById = async (stakeholderId: number): Promise<Stakeholder> => {
    try {
        const endpoint: string = `http://localhost:3005/stakeholder/getStakeholdersById/${stakeholderId}`;
        const response: AxiosResponse<Stakeholder> = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error getting stakeholder:', error);
        throw error;
    }
}

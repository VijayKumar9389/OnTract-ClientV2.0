import axios from "axios";
import { EditProjectInputDTO } from "../models/project.models.ts";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

// Get all projects
export const getProjects = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/project/getall`);
        return response.data;
    } catch (error) {
        console.error('Error getting projects:', error);
        throw error;
    }
}

// Edit a project by ID
export const editProject = async (projectId: number, projectData: EditProjectInputDTO) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/project/edit/${projectId}`, projectData);
        return response.data;
    } catch (error) {
        console.error('Error editing project:', error);
        throw error;
    }
}

// Delete a project by ID
export const deleteProject = async (projectId: number) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/project/delete/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}

// Download a project by ID
export const downloadProject = async (projectId: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tract-record/get/${projectId}`, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        console.error('Error downloading project:', error);
        throw error;
    }
}

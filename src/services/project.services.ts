import axios from "axios";

export const getProjects = async () => {
    try {
        const response = await axios.get("http://localhost:3005/project/getall");
        return response.data;
    } catch (error) {
        console.error('Error getting projects:', error);
        throw error;
    }
}
import { Project} from "../models/stakeholder.models.ts";

// Store the selected project in a cookie
export const setProjectCookie = (project: Project): void => {
    try {
        console.log('Setting project cookie:', project);
        const jsonString = JSON.stringify(project);
        document.cookie = `projectData=${encodeURIComponent(jsonString)}; path=/`;
    } catch (error) {
        console.error('Error setting project cookie:', error);
    }
};

//Get the selected project from the cookie
export const getProjectFromCookie = (): Project | null => {
    const cookieValue = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('projectData='));

    if (cookieValue) {
        const jsonString = decodeURIComponent(cookieValue.split('=')[1]);
        return JSON.parse(jsonString);
    }

    return null;
};

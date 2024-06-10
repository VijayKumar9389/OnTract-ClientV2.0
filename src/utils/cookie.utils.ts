import { Project} from "../models/stakeholder.models.ts";

// Store the selected project in a cookie
export const setProjectCookie = (project: Project): void => {
    try {
        console.log('Setting project cookie:', project);
        const jsonString: string = JSON.stringify(project);
        document.cookie = `projectData=${encodeURIComponent(jsonString)}; path=/`;
    } catch (error) {
        console.error('Error setting project cookie:', error);
    }
};

//Get the selected project from the cookie
export const getProjectFromCookie = (): Project | null => {
    const cookieValue: string | undefined = document.cookie
        .split('; ')
        .find((cookie: string) => cookie.startsWith('projectData='));

    if (cookieValue) {
        const jsonString: string = decodeURIComponent(cookieValue.split('=')[1]);
        return JSON.parse(jsonString);
    }

    return null;
};

// Delete the project cookie and reload the page
export const deleteProjectCookieAndReload = (): void => {
    // Set the cookie's expiry date to the past to delete it
    document.cookie = 'projectData=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Reload the page
    window.location.reload();
};

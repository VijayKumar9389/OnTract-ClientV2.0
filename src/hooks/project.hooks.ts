// hooks/useFetchProjects.ts
import { useState, useEffect } from "react";
import { Project } from "../models/stakeholder.models";
import { getProjects } from "../services/project.services";
import {getProjectFromCookie} from "../utils/cookie.utils.ts";
import {Location, LocationData} from "../models/report.model.ts";
import {getLocationReport} from "../services/stakeholder.services.ts";

export const useFetchProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await getProjects();
                setProjects(response);
            } catch (error) {
                setError("An error occurred while fetching projects.");
            } finally {
                setLoading(false);
            }
        };

        fetchData()
            .then(() => console.log("Projects fetched"));
    }, []);

    return { projects, loading, error };
};

export const useLocationReport = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const project = getProjectFromCookie();

    useEffect(() => {
        if (project) {
            fetchLocations()
                .then(() => console.log('Locations fetched'));
        }
    }, []);

    const fetchLocations = async () => {
        if (!project) return;
        try {
            setLoading(true);
            const fetchedLocations: LocationData[] = await getLocationReport(project.id);
            const extractedLocations: Location[] = fetchedLocations.map(item => item.locations[0]);
            setLocations(extractedLocations);
        } catch (err) {
            setError('Error fetching locations');
            console.error('Error fetching locations:', err);
        } finally {
            setLoading(false);
        }
    };

    return { locations, loading, error };
};


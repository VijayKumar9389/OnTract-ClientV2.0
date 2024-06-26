// hooks/useFetchPackageTypes.ts
import { useState, useEffect } from "react";
import {PackageType} from "../models/package.models.ts";
import {getProjectFromCookie} from "../utils/cookie.utils.ts";
import {getPackageTypesByProjectId} from "../services/package.services.ts";

// Get all package types for a project
export const useGetPackageTypesByProjectID = () => {
    const [packageTypes, setPackageTypes] = useState<PackageType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const project = getProjectFromCookie();

    useEffect((): void => {
        if (!project) return;

        const fetchPackageTypes = async () => {
            try {
                const response: PackageType[] = await getPackageTypesByProjectId(project.id);
                setPackageTypes(response);
            } catch (error) {
                setError("Error fetching package types");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackageTypes()
            .then(() => console.log("PackageTypeGrid types fetched successfully"));
    }, []);

    return { packageTypes, loading, error };
};



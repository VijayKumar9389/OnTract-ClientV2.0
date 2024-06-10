// hooks/useFetchStakeholders.ts
import {useState, useEffect} from "react";
import {Project, Stakeholder} from "../models/stakeholder.models";
import {getStakeholdersByProjectId} from "../services/stakeholder.services";
import {getProjectFromCookie} from "../utils/cookie.utils.ts";
import {StakeholderStatsDTO} from "../models/report.model";
import {getStakeholderReport} from "../services/stakeholder.services";

export const useFetchStakeholders = () => {
    const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const project: Project | null = getProjectFromCookie();

    useEffect((): void => {
        const fetchStakeholders = async (): Promise<void> => {
            if (!project) return;
            try {
                setLoading(true);
                const fetchedStakeholders: Stakeholder[] = await getStakeholdersByProjectId(project.id);
                setStakeholders(fetchedStakeholders);
                setError(null);
            } catch (error) {
                setError('Failed to fetch stakeholders');
            } finally {
                setLoading(false);
            }
        };

        fetchStakeholders()
            .then(() => console.log("Stakeholders fetched"));
    }, []);

    return {stakeholders, loading, error};
};

export const useFetchStakeholderStats = () => {
    const [stakeholderStats, setStakeholderStats] = useState<StakeholderStatsDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const project = getProjectFromCookie();

    useEffect((): void => {
        const fetchStats = async () => {
            if (!project) return;
            try {
                setLoading(true);
                const stats: StakeholderStatsDTO = await getStakeholderReport(project.id);
                setStakeholderStats(stats);
            } catch (error) {
                setError('Failed to fetch stakeholder stats');
            } finally {
                setLoading(false);
            }
        };

        fetchStats()
            .then(() => console.log("S takeholder stats fetched"));
    }, []);

    return {stakeholderStats, loading, error};
};
// hooks/useFetchStakeholders.ts
import {useState, useEffect} from "react";
import {Project, RelatedStakeholder, Stakeholder} from "../models/stakeholder.models";
import {
    getRelatedStakeholder,
    getStakeholderById,
    getStakeholdersByProjectId,
    getStakeholdersByTractNo
} from "../services/stakeholder.services";
import {getProjectFromCookie} from "../utils/cookie.utils.ts";
import {StakeholderStatsDTO} from "../models/report.model";
import {getStakeholderReport} from "../services/stakeholder.services";

export const useGetStakeholderByProjectID = () => {
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

export const useGetStakeholder = (id: string | undefined) => {
    const [stakeholder, setStakeholder] = useState<Stakeholder | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void => {
        if (!id) return;
        setLoading(true);
        getStakeholderById(parseInt(id))
            .then((response: Stakeholder): void => {
                setStakeholder(response);
                console.log("Stakeholder fetched");
            })
            .catch((): void => {
                setError("Failed to fetch stakeholder");
            })
            .finally((): void => {
                setLoading(false);
            });
    }, [id]);

    return {stakeholder, loading, error};
};

export const useRelatedStakeholders = (stakeholderId: number) => {
    const [relatedStakeholders, setRelatedStakeholders] = useState<RelatedStakeholder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRelatedStakeholders = async () => {
            try {
                const relatedStakeholders = await getRelatedStakeholder(stakeholderId);
                setRelatedStakeholders(relatedStakeholders);
            } catch (error) {
                console.error('Error getting related stakeholders:', error);
                setError('Failed to fetch related stakeholders');
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedStakeholders();
    }, [stakeholderId]);

    return { relatedStakeholders, loading, error };
};

export const useStakeholdersByTractNo = (tractNo: number) => {
    const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const project = getProjectFromCookie();

    useEffect((): void => {
        if (!project) return;

        const fetchStakeholders = async (): Promise<void> => {
            try {
                const response: Stakeholder[] = await getStakeholdersByTractNo(project.id, tractNo);
                setStakeholders(response);
            } catch (error) {
                console.error('Error fetching stakeholders:', error);
                setError('Failed to fetch stakeholders');
            } finally {
                setLoading(false);
            }
        };

        fetchStakeholders().then(() => console.log('Stakeholders fetched'));
    }, []);

    return { stakeholders, loading, error };
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
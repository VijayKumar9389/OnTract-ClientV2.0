import {StakeholderStatsDTO} from "../../../../models/stakeholder.models.ts";
import {getStakeholderReport} from "../../../../services/stakeholder.services.ts";
import {useEffect, useState} from "react";
import {getProjectFromCookie} from "../../../../utils/cookieHelper.ts";

const StakeholderStats = () => {
    const [stakeholderStats, setStakeholderStats] = useState<StakeholderStatsDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const project = getProjectFromCookie();

    const fetchStakeholderStats = async (): Promise<void> => {
        if (!project) {
            return;
        }
        try {
            setLoading(true);
            const fetchedStakeholderStats: StakeholderStatsDTO = await getStakeholderReport(project.id);
            setStakeholderStats(fetchedStakeholderStats);
        } catch (error) {
            setError('Failed to fetch stakeholder stats');
        } finally {
            setLoading(false);
        }
    }

    useEffect((): void => {
        fetchStakeholderStats();
    }, []);

    // Different returns based on different conditions or states
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!stakeholderStats) {
        return <p>Error</p>;
    }

    return (
        <div className="project-statistics">
            <div className="statistic-item">
                <span className="label">Total:</span>
                <span className="value">{stakeholderStats.totalCount}</span>
            </div>
            <div className="statistic-item">
                <span className="label">Contacted:</span>
                <span className="value">{stakeholderStats.contactedYesCount}</span>
            </div>
            <div className="statistic-item">
                <span className="label">No Contact:</span>
                <span className="value">{stakeholderStats.contactedNoCount}</span>
            </div>
            <div className="statistic-item">
                <span className="label">Consulted:</span>
                <span className="value">{stakeholderStats.consultedCount}</span>
            </div>
            <div className="statistic-item">
                <span className="label">No Consultation:</span>
                <span className="value">{stakeholderStats.notConsultedCount}</span>
            </div>
            <div className="statistic-item">
                <span className="label">Attempted:</span>
                <span className="value">{stakeholderStats.attemptedContactCount}</span>
            </div>
            <div className="statistic-item">
                <span className="label">No Attempts:</span>
                <span className="value">{stakeholderStats.notAttemptedContactCount}</span>
            </div>
        </div>
    );
}

export default StakeholderStats;
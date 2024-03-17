import './StakeholderStats.scss';
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
        <div className="stakeholder-stats">
            <p className="info-list">
                Total: <span className="info-item">{stakeholderStats.totalCount}</span>
                <span className="separator">|</span>
                Contacted: <span className="info-item">{stakeholderStats.contactedYesCount}</span>
                <span className="separator">|</span>
                No Contact: <span className="info-item">{stakeholderStats.contactedNoCount}</span>
                <span className="separator">|</span>
                Consulted: <span className="info-item">{stakeholderStats.consultedCount}</span>
                <span className="separator">|</span>
                No Consultation: <span className="info-item">{stakeholderStats.notConsultedCount}</span>
                <span className="separator">|</span>
                Attempted: <span className="info-item">{stakeholderStats.attemptedContactCount}</span>
                <span className="separator">|</span>
                No Attempts: <span className="info-item">{stakeholderStats.notAttemptedContactCount}</span>
            </p>
        </div>
    );
}

export default StakeholderStats;
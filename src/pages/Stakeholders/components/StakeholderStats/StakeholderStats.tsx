import { getStakeholderReport } from '../../../../services/stakeholder.services.ts';
import { useEffect, useState } from 'react';
import { getProjectFromCookie } from '../../../../utils/cookieHelper.ts';
import { StakeholderStatsDTO } from '../../../../models/report.model.ts';

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

    useEffect(() => {
        fetchStakeholderStats();
    }, []);

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
        <div className="stats-wrapper">
            <div className="stat-item">
                <p>Total:</p>
                <h4>{stakeholderStats.totalCount}</h4>
            </div>
            <div className="stat-item">
                <p>Contacted:</p>
                <h4>{stakeholderStats.contactedYesCount}</h4>
            </div>
            <div className="stat-item">
                <p>No Contact:</p>
                <h4>{stakeholderStats.contactedNoCount}</h4>
            </div>
            <div className="stat-item">
                <p>Consulted:</p>
                <h4>{stakeholderStats.consultedCount}</h4>
            </div>
            <div className="stat-item">
                <p>No Consultation:</p>
                <h4>{stakeholderStats.notConsultedCount}</h4>
            </div>
            <div className="stat-item">
                <p>Attempted:</p>
                <h4>{stakeholderStats.attemptedContactCount}</h4>
            </div>
            <div className="stat-item">
                <p>No Attempts:</p>
                <h4>{stakeholderStats.notAttemptedContactCount}</h4>
            </div>
            <div className="stat-item">
                <p>Delivery Planned:</p>
                <h4>{stakeholderStats.deliveryPlannedCount}</h4>
            </div>
            <div className="stat-item">
                <p>No Delivery:</p>
                <h4>{stakeholderStats.deliveryNotPlannedCount}</h4>
            </div>
        </div>
    );


}

export default StakeholderStats;

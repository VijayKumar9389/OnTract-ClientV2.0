import './StakeholderStats.scss';
import {StakeholderStatsDTO} from "../../../../models/stakeholder.models.ts";
import {getStakeholdersContactSummaryByProjectId} from "../../../../services/stakeholder.services.ts";
import {useEffect, useState} from "react";

const StakeholderStats = () => {
    const [stakeholderStats, setStakeholderStats] = useState<StakeholderStatsDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStakeholderStats = async (): Promise<void> => {
        try {
            setLoading(true);
            const projectId: number = 1;
            const fetchedStakeholderStats: StakeholderStatsDTO = await getStakeholdersContactSummaryByProjectId(projectId);
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
            <div className="stat-wrapper">
                <StatItem title={"Attempted Contact"} value={stakeholderStats.attemptedContactCount}
                          total={stakeholderStats.totalCount}/>
                <StatItem title={"Not Attempted"} value={stakeholderStats.notAttemptedContactCount}
                          total={stakeholderStats.totalCount}/>
            </div>
            <div className="stat-wrapper">
                <StatItem title={"One Tract"} value={stakeholderStats.oneTractCount}
                          total={stakeholderStats.totalCount}/>
                <StatItem title={"More Than One Tract"} value={stakeholderStats.moreThanOneTractCount}
                          total={stakeholderStats.totalCount}/>
            </div>
            <div className="stat-wrapper">
                <StatItem title={"Contacted"} value={stakeholderStats.contactedYesCount}
                          total={stakeholderStats.totalCount}/>
                <StatItem title={"Not Contacted"} value={stakeholderStats.contactedNoCount}
                          total={stakeholderStats.totalCount}/>
            </div>
            <div className="stat-wrapper">
                <StatItem title={"Consulted"} value={stakeholderStats.consultedCount}
                          total={stakeholderStats.totalCount}/>
            </div>
        </div>
    );
}

const StatItem = (props: { title: string, value: number, total: number }) => {
    return (
        <div className="stat-wrapper">
            <label className="panel-label">{props.title}</label>
            <p>{props.title}: <strong>{props.value}</strong> / {props.total}</p>
            <div className="progress-bar">
                <div className="progress" style={{width: `${(props.value / props.total) * 100}%`}}></div>
            </div>
        </div>
    );
}

export default StakeholderStats;
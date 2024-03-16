import './StakeholderReport.scss';
import {getStakeholderReport} from "../../../../services/stakeholder.services.ts";
import {useEffect, useState} from "react";
import {StakeholderStatsDTO} from "../../../../models/stakeholder.models.ts";
import {getProjectFromCookie} from "../../../../utils/cookieHelper.ts";
const StakeholderReport = () => {
    const [stakeholderReport, setStakeholderReport] = useState<StakeholderStatsDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const project = getProjectFromCookie();

    const fetchStakeholderReport = async (): Promise<void> => {
        if (!project) {
            return;
        }
        try {
            setLoading(true);
            const fetchedStakeholderReport: StakeholderStatsDTO = await getStakeholderReport(project.id);
            setStakeholderReport(fetchedStakeholderReport);
        } catch (error) {
            setError('Failed to fetch stakeholder report');
        } finally {
            setLoading(false);
        }
    }

    useEffect((): void => {
        fetchStakeholderReport();
    }, []);

    // Different returns based on different conditions or states
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!stakeholderReport) {
        return <p>Error</p>;
    }

    return (
        <div className="stakeholder-stats">
            <div className="stat-wrapper">
                <label className="panel-label">Attempted</label>
                <StatItem title={"Attempted Contact"} value={stakeholderReport.attemptedContactCount}
                          total={stakeholderReport.totalCount}/>
                <StatItem title={"Not Attempted"} value={stakeholderReport.notAttemptedContactCount}
                          total={stakeholderReport.totalCount}/>
            </div>
            <div className="stat-wrapper">
                <label className="panel-label">Multi Tract</label>
                <StatItem title={"One Tract"} value={stakeholderReport.oneTractCount}
                          total={stakeholderReport.totalCount}/>
                <StatItem title={"More Than One Tract"} value={stakeholderReport.moreThanOneTractCount}
                          total={stakeholderReport.totalCount}/>
            </div>
            <div className="stat-wrapper">
                <label className="panel-label">Contacted</label>
                <StatItem title={"Contacted"} value={stakeholderReport.contactedYesCount}
                          total={stakeholderReport.totalCount}/>
                <StatItem title={"Not Contacted"} value={stakeholderReport.contactedNoCount}
                          total={stakeholderReport.totalCount}/>
            </div>
            <div className="stat-wrapper">
                <label className="panel-label">Consulted</label>
                <StatItem title={"Consulted"} value={stakeholderReport.consultedCount}
                          total={stakeholderReport.totalCount}/>
                <StatItem title={"Not Consulted"} value={stakeholderReport.notConsultedCount}
                          total={stakeholderReport.totalCount}/>
            </div>
            <div className="stat-wrapper">
                <label className="panel-label">Delivery</label>
                <StatItem title={"Planned"} value={stakeholderReport.deliveryPlannedCount}
                          total={stakeholderReport.totalCount}/>
                <StatItem title={"Not Planned"} value={stakeholderReport.deliveryNotPlannedCount}
                          total={stakeholderReport.totalCount}/>
            </div>
        </div>
    );
}

const StatItem = (props: { title: string, value: number, total: number }) => {
    return (
        <div className="stat-item">
            <p>{props.title}: <strong>{props.value}</strong> / {props.total}</p>
            <div className="progress-bar">
                <div className="progress" style={{width: `${(props.value / props.total) * 100}%`}}></div>
            </div>
        </div>
    );
}

export default StakeholderReport;

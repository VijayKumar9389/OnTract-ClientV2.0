import './StakeholderReport.scss';
import {getStakeholderReport} from "../../../../services/stakeholder.services.ts";
import {useEffect, useState} from "react";
import {getProjectFromCookie} from "../../../../utils/cookieHelper.ts";
import {StakeholderStatsDTO} from "../../../../models/report.model.ts";
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
        <div className="report-wrapper">
            <div className="report-item">
                <label>Total Stakeholders</label>
                <h2>{stakeholderReport.totalCount}</h2>
            </div>
            <div className="report-item">
                <label>Stakeholders with One Tract</label>
                <h2>{stakeholderReport.oneTractCount}</h2>
            </div>
            <div className="report-item">
                <label>Stakeholders with More Than One Tract</label>
                <h2>{stakeholderReport.moreThanOneTractCount}</h2>
            </div>
            <div className="report-item">
                <label>Attempted Contact Count</label>
                <h2>{stakeholderReport.attemptedContactCount}</h2>
            </div>
            <div className="report-item">
                <label>Not Attempted Contact Count</label>
                <h2>{stakeholderReport.notAttemptedContactCount}</h2>
            </div>
            <div className="report-item">
                <label>Consulted Count</label>
                <h2>{stakeholderReport.consultedCount}</h2>
            </div>
            <div className="report-item">
                <label>Not Consulted Count</label>
                <h2>{stakeholderReport.notConsultedCount}</h2>
            </div>
            <div className="report-item">
                <label>Delivery Planned Count</label>
                <h2>{stakeholderReport.deliveryPlannedCount}</h2>
            </div>
            <div className="report-item">
                <label>Delivery Not Planned Count</label>
                <h2>{stakeholderReport.deliveryNotPlannedCount}</h2>
            </div>
            <div className="report-item">
                <label>Missing Phone Numbers</label>
                <h2>{stakeholderReport.missingPhoneNumbers}</h2>
            </div>
            <div className="report-item">
                <label>Contacted Yes Count</label>
                <h2>{stakeholderReport.contactedYesCount}</h2>
            </div>
            <div className="report-item">
                <label>Contacted No Count</label>
                <h2>{stakeholderReport.contactedNoCount}</h2>
            </div>
        </div>
    );
}



export default StakeholderReport;

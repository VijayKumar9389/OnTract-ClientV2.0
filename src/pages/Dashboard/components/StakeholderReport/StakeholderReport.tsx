import React from 'react';
import './StakeholderReport.scss';
import { useFetchStakeholderStats } from "../../../../hooks/stakeholders.hooks";
import {Stat} from "../../../../models/report.model.ts";

const StakeholderReport: React.FC = () => {
    const { stakeholderStats, loading, error } = useFetchStakeholderStats();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!stakeholderStats) return <p>Error</p>;

    const stats: Stat[] = [
        { label: 'Total Stakeholders', value: stakeholderStats.totalCount },
        { label: 'Tracts Tracts', value: stakeholderStats.totalTractCount },
        { label: 'Stakeholders with One Tract', value: stakeholderStats.oneTractCount },
        { label: 'Stakeholders with More Than One Tract', value: stakeholderStats.moreThanOneTractCount },
        { label: 'Attempted Contact Count', value: stakeholderStats.attemptedContactCount },
        { label: 'Not Attempted Contact Count', value: stakeholderStats.notAttemptedContactCount },
        { label: 'Consulted Count', value: stakeholderStats.consultedCount },
        { label: 'Not Consulted Count', value: stakeholderStats.notConsultedCount },
        { label: 'Delivery Planned Count', value: stakeholderStats.deliveryPlannedCount },
        { label: 'Delivery Not Planned Count', value: stakeholderStats.deliveryNotPlannedCount },
        { label: 'Missing Phone Numbers', value: stakeholderStats.missingPhoneNumbers },
        { label: 'Contacted Yes Count', value: stakeholderStats.contactedYesCount },
        { label: 'Contacted No Count', value: stakeholderStats.contactedNoCount },
        { label: 'Her Majesty Stakeholders', value: stakeholderStats.herMajestyCount },
        { label: 'Her Majesty Tracts', value: stakeholderStats.herMajestyTractCount },
    ];

    return (
        <div className="report-wrapper">
            {stats.map((stat: Stat, index: number) => (
                <div key={index} className="report-item">
                    <label>{stat.label}</label>
                    <h3>{stat.value}</h3>
                </div>
            ))}
        </div>
    );
};

export default StakeholderReport;

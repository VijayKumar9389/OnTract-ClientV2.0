// components/StakeholderStats/StakeholderStats.tsx
import React from 'react';
import { useFetchStakeholderStats } from '../../../../hooks/stakeholders.hooks.ts';
import { Stat } from '../../../../models/report.model.ts';

const StakeholderStats: React.FC = () => {
    const { stakeholderStats, loading, error } = useFetchStakeholderStats();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!stakeholderStats) return <p>Error</p>;

    const stats: Stat[] = [
        { label: 'Total', value: stakeholderStats.totalCount },
        { label: 'Contacted', value: stakeholderStats.contactedYesCount },
        { label: 'No Contact', value: stakeholderStats.contactedNoCount },
        { label: 'Consulted', value: stakeholderStats.consultedCount },
        { label: 'No Consultation', value: stakeholderStats.notConsultedCount },
        { label: 'Attempted', value: stakeholderStats.attemptedContactCount },
        { label: 'No Attempts', value: stakeholderStats.notAttemptedContactCount },
        { label: 'Delivery Planned', value: stakeholderStats.deliveryPlannedCount },
        { label: 'No Delivery', value: stakeholderStats.deliveryNotPlannedCount }
    ];

    return (
        <div className="stats-wrapper">
            {stats.map((stat: Stat, index: number) => (
                <div key={index} className="stat-item">
                    <p>{stat.label}:</p>
                    <h3>{stat.value}</h3>
                </div>
            ))}
        </div>
    );
};

export default StakeholderStats;

import React from 'react';
import { useDeliveryReport} from "../../../../hooks/delivery.hooks.ts";
import {Stat} from "../../../../models/report.model.ts";

const DeliveryStats: React.FC = () => {
    const { deliveryReport, loading, error } = useDeliveryReport();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!deliveryReport) return <p>Error</p>;

    const stats: Stat[] = [
        { label: 'Total Deliveries', value: deliveryReport.count },
        { label: 'Total Stakeholders', value: deliveryReport.stakeholderCount },
        { label: 'Delivery Pending', value: deliveryReport.pendingDeliveryCount },
        { label: 'Delivered', value: deliveryReport.completedDeliveryCount },
        { label: 'In Person', value: deliveryReport.deliveryCount },
        { label: 'Mailouts', value: deliveryReport.mailCount }
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

export default DeliveryStats;

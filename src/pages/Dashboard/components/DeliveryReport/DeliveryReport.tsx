// components/DeliveryReport.tsx
import React from 'react';
import './DeliveryReport.scss';
import { useDeliveryReport} from "../../../../hooks/delivery.hooks.ts";

const DeliveryReport: React.FC = () => {
    const { deliveryReport, loading, error } = useDeliveryReport();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!deliveryReport) return <p>Error</p>;

    const renderReportItem = (label: string, value: number) => (
        <div className="report-item">
            <label>{label}</label>
            <h2>{value}</h2>
        </div>
    );

    const renderTable = (title: string, data: Record<string, number>) => (
            <table>
                <thead>
                <tr>
                    <th>{title}</th>
                    <th>Count</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(data).map(([key, value], index) => (
                    <tr key={index}>
                        <td>{key}</td>
                        <td><strong>{value}</strong></td>
                    </tr>
                ))}
                </tbody>
            </table>
    );

    return (
        <div className="delivery-report">
            <div className="report-wrapper">
                {renderReportItem('Total Deliveries', deliveryReport.count)}
                {renderReportItem('Total Stakeholders Planned', deliveryReport.stakeholderCount)}
                {renderReportItem('Pending Delivery', deliveryReport.pendingDeliveryCount)}
                {renderReportItem('Delivery Completed', deliveryReport.completedDeliveryCount)}
            </div>
            <div className="table-container">
                {renderTable('Planned Packages', deliveryReport.packageTypeCountMap)}
                {renderTable('Planned Routes', deliveryReport.deliveryRouteCountMap)}
            </div>
        </div>
    );
};

export default DeliveryReport;

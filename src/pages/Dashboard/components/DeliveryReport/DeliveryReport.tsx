// components/DeliveryReport.tsx
import React from 'react';
import './DeliveryReport.scss';
import { useDeliveryReport } from "../../../../hooks/delivery.hooks.ts";
import NoDataMessage from "../../../../components/NoDataMessage/NoDataMessage.tsx";

const DeliveryReport: React.FC = () => {
    const { deliveryReport, loading, error } = useDeliveryReport();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!deliveryReport) return <p>Error</p>;

    const renderReportItem = (label: string, value: number) => (
        <div className="report-item" key={label}>
            <label>{label}</label>
            <h2>{value}</h2>
        </div>
    );

    const renderTable = (title: string, data: Record<string, number>, errorMessage: string) => {
        if (!data || Object.keys(data).length === 0) {
            return <NoDataMessage message={errorMessage} />;
        }

        return (
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
    };

    return (
        <div className="delivery-report">
            <div className="report-wrapper">
                {renderReportItem('Total Deliveries', deliveryReport.count)}
                {renderReportItem('Mail-Out Deliveries', deliveryReport.mailCount)}
                {renderReportItem('In-Person Deliveries', deliveryReport.streetCount)}
                {renderReportItem('Total Stakeholders Planned', deliveryReport.stakeholderCount)}
                {renderReportItem('Pending Delivery', deliveryReport.pendingDeliveryCount)}
                {renderReportItem('Delivery Completed', deliveryReport.completedDeliveryCount)}
                {renderReportItem('No Routes Planned', deliveryReport.noRouteCount)}
            </div>
            <div className="table-container">
                <div className="table-style">{renderTable('Planned Packages', deliveryReport.packageTypeCountMap, "No Packages Planned")}</div>
                <div className="table-style">{renderTable('Planned Routes', deliveryReport.deliveryRouteCountMap, "No Routes Assigned")}</div>
            </div>
        </div>
    );
};

export default DeliveryReport;

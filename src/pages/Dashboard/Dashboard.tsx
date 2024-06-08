import './Dashboard.scss';
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import StakeholderReport from "./components/StakeholderReport/StakeholderReport";
import LocationReport from "./components/LocationReport/LocationReport";
import DeliveryReport from "./components/DeliveryReport/DeliveryReport";
import React from "react";

interface ReportPanelProps {
    title: string;
    children: React.ReactNode; // Correctly typing children
}

const ReportPanel: React.FC<ReportPanelProps> = ({ title, children }) => (
    <section className="report-section">
        <div className="panel">
            <div className="panel-header">
                <h3>{title}</h3>
            </div>
            <div className="panel-content">
                {children}
            </div>
        </div>
    </section>
);

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <PageHeading heading="Dashboard" />
            <div className="page-content">
                <ReportPanel title="Stakeholder Report">
                    <StakeholderReport />
                </ReportPanel>
                <ReportPanel title="Delivery Report">
                    <DeliveryReport />
                </ReportPanel>
                <ReportPanel title="Location Report">
                    <LocationReport />
                </ReportPanel>
            </div>
        </div>
    );
}

export default Dashboard;

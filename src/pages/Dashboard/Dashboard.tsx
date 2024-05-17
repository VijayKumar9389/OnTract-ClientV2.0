import './Dashboard.scss';
import Heading from "../../components/Heading/Heading.tsx";
import StakeholderReport from "./components/StakeholderReport/StakeholderReport.tsx";
import LocationReport from "./components/LocationReport/LocationReport.tsx";
import DeliveryReport from "./components/DeliveryReport/DeliveryReport.tsx";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Heading heading="Dashboard"/>
            <div className="page-content">
                <section className="report-section">
                    <h2 className="section-header">Stakeholder Report</h2>
                    <StakeholderReport/>
                </section>
                <section className="report-section">
                    <h2 className="section-header">Delivery Report</h2>
                    <DeliveryReport />
                </section>
                <section className="report-section">
                    <LocationReport />
                </section>
            </div>
        </div>
    );
}

export default Dashboard;

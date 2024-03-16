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
                <StakeholderReport/>
                <LocationReport />
                <DeliveryReport />
            </div>
        </div>
    );
}

export default Dashboard;
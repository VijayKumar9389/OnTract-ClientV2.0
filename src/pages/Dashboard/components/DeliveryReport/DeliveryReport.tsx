import './DeliveryReport.scss';
import {getDeliveryReport} from "../../../../services/delivery.services.ts";
import {getProjectFromCookie} from "../../../../utils/cookieHelper.ts";
import {useEffect, useState} from "react";
import {DeliveryReportDTO} from "../../../../models/delivery.models.ts";
import {Project} from "../../../../models/stakeholder.models.ts";

const DeliveryReport = () => {
    const [deliveryReport, setDeliveryReport] = useState<DeliveryReportDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const project: Project | null = getProjectFromCookie();

    const fetchDeliveryReport = async (): Promise<void> => {
        if (!project) {
            return;
        }
        try {
            setLoading(true);
            const fetchedDeliveryReport: DeliveryReportDTO = await getDeliveryReport(project.id);
            setDeliveryReport(fetchedDeliveryReport);
        } catch (error) {
            setError('Failed to fetch delivery report');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDeliveryReport();
    }, []);

    // Different returns based on different conditions or states
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!deliveryReport) {
        return <p>Error</p>;
    }

    return (

        <div className="delivery-report">
            <div className="report-wrapper">
                <div className="report-item">
                    <label>Total Deliveries</label>
                    <h2>{deliveryReport.count}</h2>
                </div>
                <div className="report-item">
                    <label>Total Stakeholders Planned</label>
                    <h2>{deliveryReport.stakeholderCount}</h2>
                </div>
                <div className="report-item">
                    <label>Pending Delivery</label>
                    <h2>{deliveryReport.pendingDeliveryCount}</h2>
                </div>
                <div className="report-item">
                    <label>Delivery Completed</label>
                    <h2>{deliveryReport.completedDeliveryCount}</h2>
                </div>
            </div>
            <div className="table-container">
                <div className="panel">
                    <div className="panel-header">
                        <label className="panel-label">Planned Packages</label>
                    </div>
                    <div className="panel-content">
                        <table>
                            <thead>
                            <tr>
                                <th>Package Type</th>
                                <th>Count</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(deliveryReport?.packageTypeCountMap || {}).map(([type, count], index) => (
                                <tr key={index}>
                                    <td>{type}</td>
                                    <td><strong>{count}</strong></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="panel">
                    <div className="panel-header">
                        <label className="panel-label">Planned Routes</label>
                    </div>
                    <div className="panel-content">
                        <table>
                            <thead>
                            <tr>
                                <th>Delivery Route</th>
                                <th>Count</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(deliveryReport?.deliveryRouteCountMap || {}).map(([route, count], index) => (
                                <tr key={index}>
                                    <td>{route}</td>
                                    <td><strong>{count}</strong></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default DeliveryReport;

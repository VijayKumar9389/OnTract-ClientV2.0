import './DeliveryReport.scss';
import { getDeliveryReport } from "../../../../services/delivery.services.ts";
import { getProjectFromCookie } from "../../../../utils/cookieHelper.ts";
import { useEffect, useState } from "react";
import { DeliveryReportDTO } from "../../../../models/delivery.models.ts";

const DeliveryReport = () => {
    const [deliveryReport, setDeliveryReport] = useState<DeliveryReportDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const project = getProjectFromCookie();

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

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Delivery Report</label>
            </div>
            <div className="page-content">
                <div className="delivery-report">
                    <div className="delivery-item">
                        <div className="card-header">
                            <h3>Delivery Stats</h3>
                            <p>Total Count: <strong>{deliveryReport?.count}</strong></p>
                            <p>Stakeholder Count: <strong>{deliveryReport?.stakeholderCount}</strong></p>
                            <p>Pending Delivery Count: <strong>{deliveryReport?.pendingDeliveryCount}</strong></p>
                            <p>Completed Delivery Count: <strong>{deliveryReport?.completedDeliveryCount}</strong></p>
                        </div>
                        <div className="package-type-count">
                            <h4>Package Type Count</h4>
                            <ul>
                                {Object.entries(deliveryReport?.packageTypeCountMap || {}).map(([type, count], index) => (
                                    <li key={index}>
                                        {type}: <strong>{count}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="delivery-route-count">
                            <h4>Delivery Route Count</h4>
                            <ul>
                                {Object.entries(deliveryReport?.deliveryRouteCountMap || {}).map(([route, count], index) => (
                                    <li key={index}>
                                        {route}: <strong>{count}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeliveryReport;

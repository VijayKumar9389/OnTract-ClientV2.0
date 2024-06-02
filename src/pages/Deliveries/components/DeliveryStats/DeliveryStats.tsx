import {useEffect, useState} from "react";
import {DeliveryReportDTO} from "../../../../models/delivery.models.ts";
import {getProjectFromCookie} from "../../../../utils/cookieHelper.ts";
import {getDeliveryReport} from "../../../../services/delivery.services.ts";

const DeliveryStats = () => {

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

    useEffect((): void => {
        fetchDeliveryReport()
            .then(() => console.log('Delivery report fetched'));
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
        <div className="stats-wrapper">
            <div className="stat-item">
                <p>Total Deliveries:</p>
                <h3>{deliveryReport.count}</h3>
            </div>
            <div className="stat-item">
                <p>Total Stakeholders:</p>
                <h3>{deliveryReport.stakeholderCount}</h3>
            </div>
            <div className="stat-item">
                <p>Delivery Pending:</p>
                <h3>{deliveryReport.pendingDeliveryCount}</h3>
            </div>
            <div className="stat-item">
                <p>Delivered:</p>
                <h3>{deliveryReport.completedDeliveryCount}</h3>
            </div>
            <div className="stat-item">
                <p>In Person:</p>
                <h3>{deliveryReport.deliveryCount}</h3>
            </div>
            <div className="stat-item">
                <p>Mailouts:</p>
                <h3>{deliveryReport.mailCount}</h3>
            </div>
        </div>
    );

}

export default DeliveryStats;
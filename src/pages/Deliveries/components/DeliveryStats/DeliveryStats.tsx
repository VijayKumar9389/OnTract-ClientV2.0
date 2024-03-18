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
        <div className="project-statistics">
            <div className="statistic-item">
                <span className="label">Total:</span>
                <span className="value">{deliveryReport.count}</span>
            </div>
            <div className="statistic-item">
                <span className="label">Completed:</span>
                <span className="value">{deliveryReport.pendingDeliveryCount}</span>
            </div>
            <div className="statistic-item">
                <span className="label">Pending:</span>
                <span className="value">{deliveryReport.completedDeliveryCount}</span>
            </div>
        </div>
    );
}

export default DeliveryStats;
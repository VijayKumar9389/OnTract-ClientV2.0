import './DeliveryStats.scss';
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
        <div className="stakeholder-stats">
            <p className="info-list">
                Total: <span className="info-item">{deliveryReport.count}</span>
                <span className="separator">|</span>
                Contacted: <span className="info-item">{deliveryReport.pendingDeliveryCount}</span>
                <span className="separator">|</span>
                No Contact: <span className="info-item">{deliveryReport.completedDeliveryCount}</span>
            </p>
        </div>
    );
}

export default DeliveryStats;
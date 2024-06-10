import {useState, useEffect} from 'react';
import {Delivery, DeliveryReportDTO} from "../models/delivery.models.ts";
import {getProjectFromCookie} from "../utils/cookie.utils.ts";
import {Project} from "../models/stakeholder.models.ts";
import {getDeliveriesByProjectID, getDeliveryReport} from "../services/delivery.services.ts";

// Get all deliveries for a project
export const useGetDeliveries = () => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const project = getProjectFromCookie();

    useEffect((): void => {
        const fetchDeliveries = async (): Promise<void> => {
            if (!project) return;
            try {
                setLoading(true);
                const fetchedDeliveries: Delivery[] = await getDeliveriesByProjectID(project.id);
                setDeliveries(fetchedDeliveries);
            } catch (error) {
                setError('Failed to fetch deliveries');
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries()
            .then(() => console.log('Deliveries fetched'));
    }, []);

    return {deliveries, loading, error};
};

// Get delivery statistics for the dashboard
export const useDeliveryReport = () => {
    const [deliveryReport, setDeliveryReport] = useState<DeliveryReportDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const project: Project | null = getProjectFromCookie();

    useEffect((): void => {
        const fetchDeliveryReport = async (): Promise<void> => {
            if (!project) return;
            try {
                setLoading(true);
                const fetchedDeliveryReport: DeliveryReportDTO = await getDeliveryReport(project.id);
                setDeliveryReport(fetchedDeliveryReport);
            } catch (err) {
                setError('Failed to fetch delivery report');
            } finally {
                setLoading(false);
            }
        };
        fetchDeliveryReport()
            .then(() => console.log('Delivery report fetched'));
    }, []);

    return {deliveryReport, loading, error};
};

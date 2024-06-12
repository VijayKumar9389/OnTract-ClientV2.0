import {useState, useEffect} from 'react';
import {Delivery, DeliveryReportDTO} from "../models/delivery.models.ts";
import {getProjectFromCookie} from "../utils/cookie.utils.ts";
import {Project} from "../models/stakeholder.models.ts";
import {
    getDeliveriesByProjectID,
    getDeliveryById,
    getDeliveryByPackageId,
    getDeliveryReport
} from "../services/delivery.services.ts";

// Get deliveries for a certain project
export const useGetDeliveriesByProjectID = () => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const project = getProjectFromCookie();

    useEffect((): void => {
        const fetchDeliveries = async (): Promise<void> => {
            if (!project) return;
            setLoading(true);
            try {
                const fetchedDeliveries = await getDeliveriesByProjectID(project.id);
                setDeliveries(fetchedDeliveries);
            } catch (error) {
                setError('Failed to fetch deliveries');
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries().then(() => console.log('Deliveries fetched'));
    }, []);

    return { deliveries, loading, error };
};

// Get a delivery by its ID
export const useGetDelivery = (deliveryId: number | null) => {
    const [delivery, setDelivery] = useState<Delivery | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void => {
        if (deliveryId === null) {
            setLoading(false);
            setError('Invalid delivery ID');
            return;
        }

        const fetchDelivery = async (): Promise<void> => {
            try {
                const response: Delivery = await getDeliveryById(deliveryId);
                setDelivery(response);
            } catch (error) {
                console.error('Error fetching delivery:', error);
                setError('Failed to fetch delivery');
            } finally {
                setLoading(false);
            }
        };

        fetchDelivery().then(() => console.log('Delivery fetched'));
    }, [deliveryId]);

    return { delivery, loading, error };
};

// Get delivery by package ID
export const useGetDeliveryByPackageID = (packageId: number) => {
    const [delivery, setDelivery] = useState<Delivery | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect((): void => {
        if (!packageId) return;
        setLoading(true);
        getDeliveryByPackageId(packageId)
            .then((response: Delivery): void => {
                setDelivery(response);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching delivery by package ID:', error);
                setError('Error fetching delivery');
                setLoading(false);
            });
    }, [packageId]);

    return { delivery, error, loading };
};

// Get delivery report for a project
export const useDeliveryReport = () => {
    const [deliveryReport, setDeliveryReport] = useState<DeliveryReportDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const project: Project | null = getProjectFromCookie();

    useEffect((): void => {
        const fetchDeliveryReport = async (): Promise<void> => {
            if (!project) return;
            setLoading(true);
            try {
                const fetchedDeliveryReport: DeliveryReportDTO = await getDeliveryReport(project.id);
                setDeliveryReport(fetchedDeliveryReport);
            } catch (error) {
                console.error('Error fetching delivery report:', error);
                setError('Failed to fetch delivery report');
            } finally {
                setLoading(false);
            }
        };
        fetchDeliveryReport().then(() => console.log('Delivery report fetched'));
    }, []);

    return { deliveryReport, loading, error };
};



import './Deliveries.scss';
import Heading from "../../components/Heading/Heading.tsx";
import {GetDeliveriesByProjectID} from "../../services/delivery.services.ts";
import {Delivery} from "../../models/delivery.models.ts";
import {useEffect, useState} from "react";
import DeliveryCard from "./components/DeliveryCard/DeliveryCard.tsx";
import {getProjectFromCookie} from "../../utils/project.helper.ts";

const Deliveries = () => {

    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const project = getProjectFromCookie();

    const fetchDeliveries = async (): Promise<void> => {
        if (!project) {
            return;
        }
        try {
            setLoading(true);
            const fetchedDeliveries: Delivery[] = await GetDeliveriesByProjectID(project.id);
            setDeliveries(fetchedDeliveries);
        } catch (error) {
            setError('Failed to fetch deliveries');
        } finally {
            setLoading(false);
        }
    }

    useEffect((): void => {
        fetchDeliveries().then((): void => {});
    }, []);

    // Different returns based on different conditions or states
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (deliveries.length === 0) {
        return <p>No deliveries found.</p>;
    }

    return (
        <div className="delivery-container">
            <Heading heading="Deliveries"/>
            <div className="page-content">
                <ul className="delivery-list">
                    {deliveries.map((delivery: Delivery) => (
                        <DeliveryCard key={delivery.id} delivery={delivery}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Deliveries
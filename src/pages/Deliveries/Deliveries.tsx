import './Deliveries.scss';
import Heading from "../../components/Heading/Heading.tsx";
import { getDeliveriesByProjectID } from "../../services/delivery.services.ts";
import { Delivery } from "../../models/delivery.models.ts";
import { useEffect, useState } from "react";
import DeliveryCard from "./components/DeliveryCard/DeliveryCard.tsx";
import { getProjectFromCookie } from "../../utils/project.helper.ts";

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
            const fetchedDeliveries: Delivery[] = await getDeliveriesByProjectID(project.id);
            setDeliveries(fetchedDeliveries);
        } catch (error) {
            setError('Failed to fetch deliveries');
        } finally {
            setLoading(false);
        }
    }

    useEffect((): void => {
        fetchDeliveries();
    }, []); // Add project as a dependency to trigger re-fetching when it changes

    return (
        <div className="delivery-container">
            <Heading heading="Deliveries"/>
            <div className="page-content">
                {/* Conditionally render loading message */}
                {loading && <p>Loading...</p>}

                {/* Conditionally render error message */}
                {error && <p>Error</p>}

                {/* Render deliveries if no loading or error */}
                {!loading && !error && (
                    <ul className="delivery-list">
                        {deliveries.map((delivery: Delivery) => (
                            <DeliveryCard key={delivery.id} delivery={delivery}/>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Deliveries;

import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import DeliveryCard from './components/DeliveryCard/DeliveryCard';
import DeliveryInput from './components/DeliveryInput/DeliveryInput';
import DeliveryStats from "./components/DeliveryStats/DeliveryStats";
import { getDeliveriesByProjectID } from '../../services/delivery.services';
import { getProjectFromCookie } from '../../utils/cookieHelper';
import { Delivery } from '../../models/delivery.models';

const Deliveries = () => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [dataFetched, setDataFetched] = useState<boolean>(false);
    const project = getProjectFromCookie();

    useEffect((): void => {
        const fetchDeliveries = async (): Promise<void> => {
            if (!project) return;
            try {
                setLoading(true);
                const fetchedDeliveries: Delivery[] = await getDeliveriesByProjectID(project.id);
                setDeliveries(fetchedDeliveries);
                setDataFetched(true);
            } catch (error) {
                setError('Failed to fetch deliveries');
            } finally {
                setLoading(false);
            }
        };

        if (!dataFetched) { // Check if data has not been fetched before making the API call
            fetchDeliveries()
                .then(() => console.log('Deliveries fetched'));
        }
    }, []);

    return (
        <div className="section">
            <Heading heading="Deliveries"/>
            <div className="page-content">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && (
                    deliveries.length > 0 ? (
                        <>
                            <DeliveryStats/>
                            <div className="panel">
                                <div className="panel-header">
                                    <h3>Delivery</h3>
                                </div>
                                <div className="panel-content">
                                    <DeliveryInput/>
                                    <ul className="card-list">
                                        {deliveries.map((delivery: Delivery) => (
                                            <DeliveryCard key={delivery.id} delivery={delivery}/>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </>
                    ) : (
                        <div className="no-data-message">
                            <span>No Deliveries Created.</span>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Deliveries;


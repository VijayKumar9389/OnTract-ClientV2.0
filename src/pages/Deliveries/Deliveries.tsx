import {useEffect, useState} from 'react';
import Heading from '../../components/Heading/Heading';
import DeliveryCard from './components/DeliveryCard/DeliveryCard';
import DeliveryInput from './components/DeliveryInput/DeliveryInput';
import {getDeliveriesByProjectID} from '../../services/delivery.services';
import {getProjectFromCookie} from '../../utils/cookieHelper';
import {Delivery} from '../../models/delivery.models';
import './Deliveries.scss';

const Deliveries = () => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const project = getProjectFromCookie();

    useEffect(() => {
        const fetchDeliveries = async () => {
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

        fetchDeliveries();
    }, []);

    return (
        <div className="delivery-container">
            <Heading heading="Deliveries"/>
            <div className="page-content">

                {loading && <p>Loading...</p>}

                {error && <p>Error: {error}</p>}

                {!loading && !error && (
                    <div className="panel">
                        <div className="panel-header">
                            <label className="panel-label">Delivery List</label>
                        </div>
                        <div className="panel-content">
                            <DeliveryInput/>
                            {deliveries.length > 0 ? (
                                <ul className="delivery-list">
                                    {deliveries.map((delivery: Delivery) => (
                                        <DeliveryCard key={delivery.id} delivery={delivery}/>
                                    ))}
                                </ul>
                            ) : (
                                <div className="no-data-message">
                                    <span>No Deliveries Created.</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Deliveries;

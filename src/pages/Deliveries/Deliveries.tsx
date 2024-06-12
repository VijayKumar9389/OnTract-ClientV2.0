import React from 'react';
import PageHeading from '../../components/PageHeading/PageHeading.tsx';
import DeliveryCard from './components/DeliveryCard/DeliveryCard';
import DeliveryInput from './components/DeliveryInput/DeliveryInput';
import DeliveryStats from "./components/DeliveryStats/DeliveryStats";
import {useGetDeliveriesByProjectID} from "../../hooks/delivery.hooks.ts";
import {Delivery} from "../../models/delivery.models.ts";

const Deliveries: React.FC = () => {
    const {deliveries, loading, error} = useGetDeliveriesByProjectID();

    return (
        <div className="section">
            <PageHeading heading="Deliveries"/>
            <div className="page-content">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && (
                    deliveries.length > 0 ? (
                        <>
                            <DeliveryStats/>
                            <DeliveryInput/>
                            <p className="list-stat">Results: <strong>{deliveries.length}</strong></p>
                            <ul className="card-list">
                                {deliveries.map((delivery: Delivery) => (
                                    <DeliveryCard key={delivery.id} delivery={delivery}/>
                                ))}
                            </ul>
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

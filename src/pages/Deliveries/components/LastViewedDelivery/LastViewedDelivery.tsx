import DeliveryCard from "../DeliveryList/DeliveryCard.tsx";
import { useSelector } from 'react-redux';
import {RootState} from "../../../../store";
import {useGetDelivery} from "../../../../hooks/delivery.hooks.ts";

const LastViewedDelivery = () => {
    const lastViewedDelivery: number = useSelector(
        (state: RootState) => state.delivery.lastViewedDelivery
    );
    const { delivery, loading, error } = useGetDelivery(
        lastViewedDelivery
    );

    if (lastViewedDelivery === 0) return null; // Don't render if no delivery is selected
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!delivery) return null;

    return (
        <div className="last-viewed">
            <label>Last Viewed</label>
            <div className="panel">
                <DeliveryCard delivery={delivery} />
            </div>
        </div>
    );
};

export default LastViewedDelivery;
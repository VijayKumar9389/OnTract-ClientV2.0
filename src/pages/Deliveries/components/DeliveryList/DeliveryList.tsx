import React from "react";
import NoDataMessage from "../../../../components/NoDataMessage/NoDataMessage";
import DeliveryCard from "./DeliveryCard.tsx";
import {Delivery} from "../../../../models/delivery.models.ts";

const DeliveryList: React.FC<{ deliveries: Delivery[] }> = ({deliveries}) => {
    if (deliveries.length === 0) return <NoDataMessage message="No Deliveries match filter."/>;

    return (
        <ul className="card-list">
            {deliveries.map(delivery => (
                <DeliveryCard key={delivery.id} delivery={delivery}/>
            ))}
        </ul>
    );
}

export default DeliveryList;

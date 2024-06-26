import React from "react";
import { Delivery } from "../../../../models/delivery.models.ts";
import { FaInfoCircle } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { NavigationUtils } from "../../../../utils/navigation.utils.ts";
import { isMailout } from "../../../../utils/functions.utils.ts";
import {StatusItem} from "../../../../components/Stat/StatusStat.tsx";
import {DeliveryTypeItem} from "../../../../components/Stat/DeliveryTypeStat.tsx";
import {NumberItem} from "../../../../components/Stat/NumberStat.tsx";
import {useDispatch} from "react-redux";


const DeliveryCard: React.FC<{ delivery: Delivery }> = ({ delivery }) => {
    const { navigateToDelivery } = NavigationUtils();
    const dispatch = useDispatch();

    return (
        <div className="card" onClick={() => navigateToDelivery(delivery.id, dispatch)}>
            <div className="card-header">
                <h3>{delivery.destination}</h3>
                <p>{delivery.route}</p>
            </div>
            <ul className="detail-list">
                <DeliveryTypeItem deliveryMethod={delivery.delivery_method} isMailout={isMailout} />
                <NumberItem icon={<IoPerson />} label="Stakeholders" number={delivery.packages.length} />
                <StatusItem icon={<FaInfoCircle />} label="Status" isAvailable={delivery.completed} availableText={"Completed"} unavailableText={"Pending"}/>
            </ul>
        </div>
    );
}

export default DeliveryCard;


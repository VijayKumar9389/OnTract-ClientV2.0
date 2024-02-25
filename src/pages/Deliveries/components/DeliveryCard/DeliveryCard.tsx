import './DeliveryCard.scss';
import React from "react";
import {Delivery} from "../../../../models/delivery.models.ts";
import PackageTable from "../PackageTable/PackageTable.tsx";
import {useNavigate} from "react-router-dom";

const DeliveryCard: React.FC<{ delivery: Delivery }> = ({delivery}) => {
    const navigate = useNavigate();

    const selectDelivery = (delivery: Delivery): void => {
        navigate(`/deliveries/${delivery.id}`);
    }

    const isMailout = (method: string) => method === 'mail';
    const isPending = (status: string) => status === 'pending';

    return (
        <div className="delivery-card" onClick={() => selectDelivery(delivery)}>
            <label className="panel-label">{delivery.destination}</label>
            <div className="details">
                <p className="detail">Route: <span className="value">{delivery.route}</span></p>
                <p className="detail">Type: <span className="value">{isMailout(delivery.delivery_method) ? 'Mail-out' : 'In-Person'}</span></p>
                <p className="detail">Status: <span className="value">{isPending(delivery.status) ? 'Pending' : 'Completed'}</span></p>
            </div>
            <PackageTable packages={delivery.packages} />
        </div>
    );
}

export default DeliveryCard;

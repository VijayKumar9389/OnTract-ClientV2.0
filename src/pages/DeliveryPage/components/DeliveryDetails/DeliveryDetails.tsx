import './DeliveryDetails.scss';
import {Delivery} from "../../../../models/delivery.models.ts";
import React from "react";

const DeliveryDetails: React.FC<{delivery: Delivery}> = ({delivery}) => {

    return (
        <div className="delivery-details">
            <p className="info-list">
                Status: <span className="info-item">{delivery.status}</span>
                <span className="separator">|</span>
                Date: <span className="info-item">{delivery.date}</span>
                <span className="separator">|</span>
                Type: <span className="info-item">{delivery.delivery_method}</span>
            </p>
            <button className="edit-button">Mark as Completed</button>
        </div>
    );
}

export default DeliveryDetails;
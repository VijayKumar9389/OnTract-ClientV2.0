import React from 'react';
import {Delivery} from '../../../../models/delivery.models';
import {NavigationUtils} from '../../../../utils/navigation.utils.ts';
import {isMailout} from '../../../../utils/functions.utils.ts';
import './StakeholderDelivery.scss';
import {Package} from "../../../../models/package.models.ts";

const DeliveryDetails: React.FC<{ delivery: Delivery }> = ({delivery}) => {
    const {navigateToDelivery} = NavigationUtils();

    return (
        <div className="stakeholder-delivery-details">

            <div className="card-header">
                <h3>{delivery.destination}</h3>
                <p>{delivery.notes}</p>
            </div>
            <p className="info-list">
                Type: <span
                className="info-item">{isMailout(delivery.delivery_method) ? 'Mail Out' : 'In Person'}</span>
                <span className="separator">|</span>
                Stakeholders: <span className="info-item">{delivery.packages.length}</span>
                <span className="separator">|</span>
                Status: <span className="info-item">{delivery.completed ? 'Completed' : 'Pending'}</span>
            </p>
            <table className="delivery-table">
                <thead>
                <tr>
                    <th>Package</th>
                    <th>Stakeholder</th>
                </tr>
                </thead>
                <tbody>
                {delivery.packages?.map((deliveryPackage: Package) => (
                    <tr key={deliveryPackage.id}>
                        <td className="package-name">{deliveryPackage.packageType.name}</td>
                        <td className="stakeholder-name">{deliveryPackage.stakeholder.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="btn-container">
                <button onClick={() => navigateToDelivery(delivery.id)}>
                    View Delivery
                </button>
            </div>
        </div>
    );
};

export default DeliveryDetails;

import React from 'react';
import {Delivery} from '../../../../models/delivery.models';
import {NavigationUtils} from '../../../../utils/navigation.utils.ts';
import {isMailout} from '../../../../utils/functions.utils.ts';
import './StakeholderDelivery.scss';
import {useDispatch} from "react-redux";

const DeliveryDetails: React.FC<{ delivery: Delivery }> = ({delivery}) => {
    const {navigateToDelivery} = NavigationUtils();
    const dispatch = useDispatch();

    return (
        <div className="stakeholder-delivery-details">
            <div className="card-header">
                <h3>{delivery.destination}</h3>
                <p className="notes">{delivery.notes}</p>
            </div>
            <div className="info-list">
                <span>Type: <span className="info-item">{isMailout(delivery.delivery_method) ? 'Mail Out' : 'In Person'}</span></span>
                <span className="separator">|</span>
                <span>Stakeholders: <span className="info-item">{delivery.packages.length}</span></span>
                <span className="separator">|</span>
                <span>Status: <span className="info-item">{delivery.completed ? 'Completed' : 'Pending'}</span></span>
            </div>
            <table className="delivery-table">
                <thead>
                <tr>
                    <th>Package</th>
                    <th>Stakeholder</th>
                </tr>
                </thead>
                <tbody>
                {delivery.packages.map((deliveryPackage) => (
                    <tr key={deliveryPackage.id}>
                        <td className="package-name">{deliveryPackage.packageType.name}</td>
                        <td className="stakeholder-name">{deliveryPackage.stakeholder.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="btn-container">
                <button onClick={() => navigateToDelivery(delivery.id, dispatch)}>
                    View Delivery
                </button>
            </div>
        </div>
    );
};

export default DeliveryDetails;

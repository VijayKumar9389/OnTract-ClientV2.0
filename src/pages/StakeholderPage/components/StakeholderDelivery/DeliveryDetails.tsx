import React from 'react';
import { Delivery } from '../../../../models/delivery.models';
import { NavigationUtils } from '../../../../utils/navigation.utils.ts';
import { isMailout } from '../../../../utils/functions.utils.ts';
import './StakeholderDelivery.scss';
import {Package} from "../../../../models/package.models.ts";

const DeliveryDetails: React.FC<{ delivery: Delivery }> = ({ delivery }) => {
    const { navigateToDelivery } = NavigationUtils();

    return (
        <div className="stakeholder-delivery-details">
            <div className="delivery-header">
                <div className="delivery-info">
                    <h3>{delivery.destination}</h3>
                    <p>{delivery.notes}</p>
                </div>
                <div className="view-delivery">
                    <button onClick={() => navigateToDelivery(delivery.id)}>
                        View Delivery
                    </button>
                </div>
            </div>

            <ul className="delivery-stats">
                <li className="stat-item">
                    <p>Type:</p>
                    <span className="value">{isMailout(delivery.delivery_method) ? 'Mail Out' : 'In Person'}</span>
                </li>
                <li className="stat-item">
                    <p>Stakeholders:</p>
                    <span className="value">{delivery.packages.length}</span>
                </li>
                <li className="stat-item">
                    <p>Status:</p>
                    <span className={`chip ${delivery.completed ? 'green' : 'red'}`}>
                        {delivery.completed ? 'Completed' : 'Pending'}
                    </span>
                </li>
            </ul>

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
        </div>
    );
};

export default DeliveryDetails;

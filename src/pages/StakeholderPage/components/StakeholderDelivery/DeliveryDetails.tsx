import React from 'react';
import {Delivery} from '../../../../models/delivery.models.ts';
import {Navigation} from "../../../../utils/navigation.ts";

const DeliveryDetails: React.FC<{ delivery: Delivery }> = ({delivery}) => {
    const {navigateToDelivery} = Navigation();

    return (
        <div>
            <div className="card-header">
                <h3>{delivery.destination}</h3>
                <p>{delivery.notes}</p>
            </div>

            <table className="package-table">
                <thead>
                <tr>
                    <th>Package</th>
                    <th>Stakeholder</th>
                </tr>
                </thead>
                <tbody>
                {delivery.packages?.map((deliveryPackage) => (
                    <tr key={deliveryPackage.id}>
                        <td>
                            <span className="package-name">{deliveryPackage.packageType.name}</span>
                        </td>
                        <td>
                            <span className="stakeholder-name">{deliveryPackage.stakeholder.name}</span>
                        </td>
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

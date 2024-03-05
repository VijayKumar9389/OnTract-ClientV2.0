import React from 'react';
import { FaArrowRight, FaBox, FaUser } from 'react-icons/fa';
import { Delivery } from '../../../../models/delivery.models.ts';

const DeliveryDetails: React.FC<{delivery: Delivery}> = ({ delivery }) => {
    return (
        <div className="delivery-details">
            <h3 className="destination">{delivery.destination}</h3>
            <p className="notes">{delivery.notes}</p>
            <table className="package-table">
                <tbody>
                {delivery.packages?.map((deliveryPackage) => (
                    <tr key={deliveryPackage.id} className="package-item">
                        <td className="package-info">
                            <FaBox className="icon" />
                            <span className="package-name">{deliveryPackage.packageType.name}</span>
                        </td>
                        <td className="arrow">
                            <FaArrowRight className="arrow-icon" />
                            <strong></strong>
                        </td>
                        <td className="stakeholder-info">
                            <FaUser className="icon" />
                            <span className="stakeholder-name">{deliveryPackage.stakeholder.name}</span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeliveryDetails;

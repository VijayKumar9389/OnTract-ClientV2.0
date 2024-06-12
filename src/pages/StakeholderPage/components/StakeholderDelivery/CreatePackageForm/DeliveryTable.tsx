import React from 'react';
import { Delivery} from '../../../../../models/delivery.models.ts';
import {Package} from "../../../../../models/package.models.ts";

interface DeliveryTableProps {
    deliveries: Delivery[] | null;
    selectedDeliveryId: number;
    handleDeliverySelection: (deliveryId: number) => void;
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({ deliveries, selectedDeliveryId, handleDeliverySelection }) => {
    const isRowSelected = (deliveryId: number): boolean => selectedDeliveryId === deliveryId;

    return (
        <div className="input-wrapper">
            <label>Select Delivery:</label>
            <div className="table-wrapper">
                <table className="select-table">
                    <thead>
                    <tr>
                        <th>Destination</th>
                        <th>Stakeholders</th>
                    </tr>
                    </thead>
                    <tbody>
                    {deliveries && deliveries.map((delivery: Delivery) => (
                        <tr
                            key={delivery.id}
                            className={isRowSelected(delivery.id) ? "selected" : ""}
                            onClick={() => handleDeliverySelection(delivery.id)}
                        >
                            <td>{delivery.destination}</td>
                            <td>
                                <ul>
                                    {delivery.packages.map((pkg: Package) => (
                                        <li key={pkg.id}>
                                            {pkg.stakeholder.name}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeliveryTable;

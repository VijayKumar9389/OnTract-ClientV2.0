import React, { useState } from "react";
import './PackageItemTable.scss';
import { Package } from "../../../../models/package.models.ts";
import { Item } from "../../../../models/item.models.ts";
import { Navigation } from "../../../../utils/navigation.ts";

const PackageItemTable: React.FC<{ packages: Package[], item: Item }> = ({packages, item}) => {
    const { navigateToPackage, navigateToStakeholder, navigateToDelivery } = Navigation();
    const [deliveryType, setDeliveryType] = useState('All'); // State to track the selected delivery type

    // Function to toggle delivery type
    const toggleDeliveryType = (type: string) => {
        setDeliveryType(type);
    };

    // Filter packages based on delivery type
    const filteredPackages = deliveryType === 'Completed' ?
        packages.filter((deliveryPackage: Package) => deliveryPackage.delivery.completed) :
        deliveryType === 'Pending' ?
            packages.filter((deliveryPackage: Package) => !deliveryPackage.delivery.completed) :
            packages;

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Scheduled Items</label>
            </div>
            <div className="panel-content">
                {/* Submenu */}
                <div className="submenu">
                    <div className={`submenu-item ${deliveryType === 'All' ? 'selected' : ''}`} onClick={() => toggleDeliveryType('All')}>
                        All
                    </div>
                    <div className={`submenu-item ${deliveryType === 'Completed' ? 'selected' : ''}`} onClick={() => toggleDeliveryType('Completed')}>
                        Completed
                    </div>
                    <div className={`submenu-item ${deliveryType === 'Pending' ? 'selected' : ''}`} onClick={() => toggleDeliveryType('Pending')}>
                        Pending
                    </div>
                </div>

                {/* Package Table */}
                {filteredPackages.length > 0 ? (
                    <table className="package-table">
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Package</th>
                            <th>Stakeholder</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody className="details">
                        {filteredPackages.map((deliveryPackage: Package) => (
                            <tr key={deliveryPackage.id} className="package-item">
                                <td><span>{item.name}</span></td>
                                <td><span>{deliveryPackage.packageType.name}</span></td>
                                <td><span className="delivery-list-name">{deliveryPackage.stakeholder.name}</span></td>
                                <td>
                                        <span>
                                            {deliveryPackage.delivery.completed
                                                ? <a className="chip green">Completed</a>
                                                : <a className="chip red">Pending</a>
                                            }
                                        </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => navigateToPackage(deliveryPackage.packageType.id)}>View Package</button>
                                        <button onClick={() => navigateToStakeholder(deliveryPackage.stakeholder.id)}>View Stakeholder</button>
                                        <button onClick={() => navigateToDelivery(deliveryPackage.deliveryId)}>View Delivery</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data-message">
                        <span>No Items Scheduled.</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PackageItemTable;


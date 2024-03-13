import React from "react";
import './PackageItemTable.scss';
import {Package} from "../../../../models/package.models.ts";
import {Item} from "../../../../models/item.models.ts";
import {Navigation} from "../../../../utils/navigation.ts";

const PackageItemTable: React.FC<{ packages: Package[], item: Item }> = ({packages, item}) => {
    const {navigateToPackage, navigateToStakeholder, navigateToDelivery} = Navigation();

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Scheduled Items</label>
            </div>
            <div className="panel-content">
                {packages.length > 0 ? (
                    // If there are packages, display the table
                    <table className="package-table">
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Package</th>
                            <th>Stakeholder</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody className="details">
                        {packages.map((deliveryPackage: Package) => (
                            <tr key={deliveryPackage.id} className="package-item">
                                <td>
                                    <span>{item.name}</span>
                                </td>
                                <td>
                                    <span>{deliveryPackage.packageType.name}</span>
                                </td>
                                <td>
                                    <span className="delivery-list-name">{deliveryPackage.stakeholder.name}</span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => navigateToPackage(deliveryPackage.packageType.id)}>View
                                            Package
                                        </button>
                                        <button
                                            onClick={() => navigateToStakeholder(deliveryPackage.stakeholder.id)}>View
                                            Stakeholder
                                        </button>
                                        <button onClick={() => navigateToDelivery(deliveryPackage.deliveryId)}>View
                                            Delivery
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    // Else, display a message
                    <div className="no-data-message">
                        <span>No Items Scheduled.</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PackageItemTable;

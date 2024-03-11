import React from "react";
import {Package} from "../../../../models/package.models.ts";
import './PackageDeliveryTable.scss';

const PackageDeliveryTable: React.FC<{ packages: Package[] }> = ({packages}) => (
    <div className="panel">
        <div className="panel-header">
            <label className="panel-label">Scheduled Packages</label>
        </div>
        <div className="panel-content">
            {packages.length > 0 ? (
                // If there are packages, display them in a table
                <table className="package-table">
                    <thead>
                    <tr>
                        <th>Package</th>
                        <th>Stakeholder</th>
                        <th>actions</th>
                    </tr>
                    </thead>
                    <tbody className="details">
                    {packages.map((deliveryPackage: Package) => (
                        <tr key={deliveryPackage.id} className="package-item">
                            <td>
                                <span>{deliveryPackage.packageType.name}</span>
                            </td>
                            <td>
                                <span className="delivery-list-name">{deliveryPackage.stakeholder.name}</span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button>View Delivery</button>
                                    <button>View stakeholder</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                // Else, display a message
                <div className="no-data-message">
                    <span>No Packages Scheduled.</span>
                </div>
            )}
        </div>
    </div>
);


export default PackageDeliveryTable;
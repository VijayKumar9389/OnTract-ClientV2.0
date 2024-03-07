import React from "react";
import './PackageItemTable.scss';
import {Package} from "../../../../models/package.models.ts";
import {Item} from "../../../../models/item.models.ts";


const PackageItemTable: React.FC<{ packages: Package[], item: Item }> = ({packages, item}) => (
    <div className="panel">
        <div className="panel-header">
            <label className="panel-label">Scheduled Items</label>
        </div>
        <div className="panel-content">
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
                                <button>View Package</button>
                                <button>View stakeholder</button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>

);


export default PackageItemTable;
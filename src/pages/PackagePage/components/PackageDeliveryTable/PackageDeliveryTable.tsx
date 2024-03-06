import React from "react";
import {Package} from "../../../../models/package.models.ts";
import {FaArrowRight, FaBox, FaUser} from "react-icons/fa";
import './PackageDeliveryTable.scss';


const PackageDeliveryTable: React.FC<{ packages: Package[] }> = ({ packages }) => (
    <div className="panel">

        <div className="panel-header">
            <label className="panel-label">Scheduled Packages</label>
        </div>

        <div className="panel-content">
            <table className="package-delivery-table">
                <tbody className="details">
                {packages.map((deliveryPackage: Package) => (
                    <tr key={deliveryPackage.id} className="package-item">
                        <td>
                            <FaBox className="icon"/>
                            <span>{deliveryPackage.packageType.name}</span>
                        </td>
                        <td>
                            <FaArrowRight className="arrow-icon"/>
                            <strong></strong>
                        </td>
                        <td>
                            <FaUser className="user-icon"/>
                            <span className="delivery-list-name">{deliveryPackage.stakeholder.name}</span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
);


export default PackageDeliveryTable;
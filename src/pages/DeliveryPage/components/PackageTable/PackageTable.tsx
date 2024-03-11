import React from "react";
import {Package} from "../../../../models/package.models.ts";
import "./PackageTable.scss";
import PackageTableRow from "./PackageTableRow.tsx"; // Import CSS file for styling

const PackageTable: React.FC<{ packages: Package[] }> = ({packages}) => {
    return (
        <div className="panel">
            <div className="header">
                <label className="panel-label">Delivery Packages</label>
            </div>
            <div className="panel-content">
                <div className="table-wrapper">
                    <table className="package-table">
                        <thead>
                        <tr>
                            <th>Package</th>
                            <th>Stakeholder</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {packages.map((deliveryPackage: Package) => (
                            <PackageTableRow key={deliveryPackage.id} deliveryPackage={deliveryPackage}/>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PackageTable;

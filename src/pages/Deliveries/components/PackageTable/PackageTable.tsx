import './PackageTable.scss';
import React from "react";
import {FaBox, FaArrowRight, FaUser} from "react-icons/fa";
import {Package} from "../../../../models/package.models.ts";

const PackageTable: React.FC<{packages: Package[]}> = ({packages}) => {
    return (
        <table className="package-table">
            <tbody className="details">
            {packages.map((deliveryPackage: Package) => (
                <tr key={deliveryPackage.id}>
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
    );
}

export default PackageTable;
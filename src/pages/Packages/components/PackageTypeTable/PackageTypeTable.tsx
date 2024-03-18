import {PackageType} from "../../../../models/package.models.ts";
import {Navigation} from "../../../../utils/navigation.ts";
import {FiPackage} from 'react-icons/fi';
import React from "react";

const PackageTypeTable: React.FC<{ packageTypes: PackageType[] }> = ({packageTypes}) => {
    const {navigateToPackage} = Navigation();
    return (
        <div className="panel">
            <div className="panel-content">
                {packageTypes.length > 0 ? (
                    <table className="select-table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Package</th>
                            <th>Items</th>
                        </tr>
                        </thead>
                        <tbody>
                        {packageTypes.map((packageType: PackageType) => (
                            <tr key={packageType.id}
                                onClick={() => navigateToPackage(packageType.id)}>
                                <td className="table-icon">
                                    <FiPackage/>
                                </td>
                                <td>
                                    <h3>{packageType.name}</h3>
                                    <p>{packageType.notes}</p>
                                </td>
                                <td>
                                    <strong>{packageType.items.length}</strong>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data-message">
                        <span>No Packages Created.</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PackageTypeTable;

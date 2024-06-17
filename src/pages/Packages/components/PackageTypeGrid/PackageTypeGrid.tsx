import { PackageType } from "../../../../models/package.models.ts";
import { FiPackage } from 'react-icons/fi';
import React from "react";
import { NavigationUtils } from "../../../../utils/navigation.utils.ts";
import NoDataMessage from "../../../../components/NoDataMessage/NoDataMessage.tsx";

const PackageTypeGrid: React.FC<{ packageTypes: PackageType[] }> = ({ packageTypes }) => {
    const { navigateToPackage } = NavigationUtils();

    return (
        <div className="grid">
            {packageTypes.length > 0 ? (
                <ul className="grid-list">
                    {packageTypes.map((packageType: PackageType) => (
                        <li key={packageType.id} className="grid-item" onClick={() => navigateToPackage(packageType.id)}>
                            <div className="grid-card">
                                <div className="card-icon">
                                    <FiPackage/>
                                </div>
                                <div className="card-content">
                                    <h3>{packageType.name}</h3>
                                    <p>{packageType.notes}</p>
                                </div>
                                <label className="card-number">items: <strong>{packageType.items.length}</strong></label>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <NoDataMessage message="No package types added."/>
            )}
        </div>
    );
}

export default PackageTypeGrid;

import {Package} from "../../../../models/package.models.ts";
import React from "react";

const PackageStats: React.FC<{ packages: Package[] }> = ({packages}) => {
    // get the number of packages that have a completed delivery
    const completedDeliveries = packages.filter((deliveryPackage: Package) => deliveryPackage.delivery.completed);

    //get the number of packages that have a pending delivery
    const pendingDeliveries = packages.filter((deliveryPackage: Package) => !deliveryPackage.delivery.completed);

    return (
        <div className="stats-wrapper">
            <div className="stat-item">
                <p>Scheduled:</p>
                <h4>{packages.length}</h4>
            </div>
            <div className="stat-item">
                <p>Delivered:</p>
                <h4>{completedDeliveries.length}</h4>
            </div>
            <div className="stat-item">
                <p>Pending:</p>
                <h4>{pendingDeliveries.length}</h4>
            </div>
        </div>
    );

}

export default PackageStats;

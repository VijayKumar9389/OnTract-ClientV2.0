import './ItemStats.scss';
import React from "react";
import {Item} from "../../../../models/item.models.ts";
import {Package} from "../../../../models/package.models.ts";

const ItemStats: React.FC<{item: Item, packages: Package[] | null}> = ({item, packages}) => {

    if (!packages) return null;

    // get the number of packages that have a completed delivery
    const completedDeliveries = packages.filter((deliveryPackage: Package) => deliveryPackage.delivery.completed);

    //get the number of packages that have a pending delivery
    const pendingDeliveries = packages.filter((deliveryPackage: Package) => !deliveryPackage.delivery.completed);

    return (
        <div className="project-statistics">
            <div className="statistic-item">
                <span className="label">Stock:</span>
                <span className="value">{item.quantity}</span>
            </div>
            <div className="statistic-item">
                <span className="label">Remaining:</span>
                <span className="value">{item.quantity - packages.length}</span>
            </div>
            <div className="statistic-item">
                <span className="label">Scheduled:</span>
                <span className="value">{packages.length}</span>
            </div>
            <div className="statistic-item">
                <span className="label">Completed:</span>
                <span className="value">{completedDeliveries.length}</span>
            </div>
            <div className="statistic-item">
                <span className="label">Pending Deliveries:</span>
                <span className="value">{pendingDeliveries.length}</span>
            </div>
        </div>
    );

}

export default ItemStats;
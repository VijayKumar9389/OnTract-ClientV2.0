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
        <div className="item-stats">
            <p className="info-list">
                Stock: <span className="info-item">{item.quantity}</span>
                <span className="separator">|</span>
                Remaining: <span className="info-item">{item.quantity - packages.length}</span>
                <span className="separator">|</span>
                Scheduled: <span className="info-item">{packages.length}</span>
                <span className="separator">|</span>
                Completed: <span className="info-item">{completedDeliveries.length}</span>
                <span className="separator">|</span>
                Pending Deliveries: <span className="info-item">{pendingDeliveries.length}</span>
            </p>
        </div>
    );
}

export default ItemStats;
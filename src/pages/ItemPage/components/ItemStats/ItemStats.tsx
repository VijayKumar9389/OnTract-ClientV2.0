import React from "react";
import { Item } from "../../../../models/item.models.ts";
import { Package } from "../../../../models/package.models.ts";

const ItemStats: React.FC<{ item: Item; packages: Package[] | null }> = ({ item, packages }) => {
    if (!packages) return null;

    const completedDeliveries: Package[] = packages.filter((deliveryPackage: Package) => deliveryPackage.delivery?.completed);
    const pendingDeliveries: Package[] = packages.filter((deliveryPackage: Package) => !deliveryPackage.delivery?.completed);

    const calculateTotalQuantity = (deliveries: Package[]): number => {
        return deliveries.reduce((total, delivery) => {
            return total + (delivery.packageType.items.find(deliveryItem => deliveryItem.item.id === item.id)?.quantity || 0);
        }, 0);
    };

    const totalQuantityCompleted: number = calculateTotalQuantity(completedDeliveries);
    const totalQuantityPending: number = calculateTotalQuantity(pendingDeliveries);
    const totalQuantity: number = totalQuantityCompleted + totalQuantityPending;

    return (
        <div className="stats-wrapper">
            <div className="stat-item">
                <p>Stock:</p>
                <h4>{item.quantity}</h4>
            </div>
            <div className="stat-item">
                <p>Remaining:</p>
                <h4>{item.quantity - totalQuantity}</h4>
            </div>
            <div className="stat-item">
                <p>Scheduled:</p>
                <h4>{totalQuantity}</h4>
            </div>
            <div className="stat-item">
                <p>Completed:</p>
                <h4>{totalQuantityCompleted}</h4>
            </div>
            <div className="stat-item">
                <p>Pending Deliveries:</p>
                <h4>{totalQuantityPending}</h4>
            </div>
            <div className="stat-item">
                <p>Total Quantity:</p>
                <h4>{totalQuantity}</h4>
            </div>
        </div>
    );
};

export default ItemStats;

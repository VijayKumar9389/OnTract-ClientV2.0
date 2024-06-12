import React from "react";
import { Item } from "../../../../models/item.models.ts";
import { Package } from "../../../../models/package.models.ts";

const ItemStats: React.FC<{ item: Item; packages: Package[] | null }> = ({ item, packages }) => {
    if (!packages) return null;

    const completedDeliveries: Package[] = packages.filter((deliveryPackage: Package) => deliveryPackage.delivery?.completed);
    const pendingDeliveries: Package[] = packages.filter((deliveryPackage: Package) => !deliveryPackage.delivery?.completed);

    const calculateTotalQuantity = (deliveries: Package[]): number => {
        return deliveries.reduce((total: number, delivery: Package) => {
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
                <h3>{item.quantity}</h3>
            </div>
            <div className="stat-item">
                <p>Remaining:</p>
                <h3>{item.quantity - totalQuantity}</h3>
            </div>
            <div className="stat-item">
                <p>Scheduled:</p>
                <h3>{totalQuantity}</h3>
            </div>
            <div className="stat-item">
                <p>Completed:</p>
                <h3>{totalQuantityCompleted}</h3>
            </div>
            <div className="stat-item">
                <p>Pending Deliveries:</p>
                <h3>{totalQuantityPending}</h3>
            </div>
        </div>
    );
};

export default ItemStats;

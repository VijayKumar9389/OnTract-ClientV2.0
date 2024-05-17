import React from "react";
import { PackageItem } from "../../../../models/item.models.ts";
import PackageItemRow from "./PackageItemRow.tsx";
import "./PackageItemTable.scss";
import AddPackageItem from "./AddPackageItem.tsx";

const PackageItemTable: React.FC<{
    packageItems: PackageItem[];
    packageTypeId: number;
}> = ({ packageItems, packageTypeId }) => {
    const updateQuantity = (itemId: number, newQuantity: number): void => {
        console.log("Item ID:", itemId, "New Quantity:", newQuantity);
        // Update the parent component's state or perform any other action with updatedPackageItems
    };

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Items in Package</label>
            </div>
            <div className="panel-content">
                <AddPackageItem packageTypeID={packageTypeId} />
                {packageItems.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Item</th>
                            <th>In Package</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {packageItems.map((item: PackageItem) => (
                            <PackageItemRow key={item.id} item={item} onUpdateQuantity={(newQuantity: number) => updateQuantity(item.id, newQuantity)} />
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data-message">
                        <span>No Items in Package</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PackageItemTable;

import React, { useState } from "react";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton.tsx";
import { deletePackageItem, updatePackageItemQuantity } from "../../../../services/item.services.ts";
import { Navigation } from "../../../../utils/navigation.ts";
import { PackageItem } from "../../../../models/item.models.ts";
import Counter from "../../../../components/Counter/Counter.tsx";

const PackageItemRow: React.FC<{
    item: PackageItem;
    onUpdateQuantity: (newQuantity: number) => void;
}> = ({ item, onUpdateQuantity }) => {

    const { navigateToInventoryItem } = Navigation();
    const [quantity, setQuantity] = useState(item.quantity || 0);

    const removeItem = async (): Promise<void> => {
        try {
            await deletePackageItem(item.id);
            console.log("Item removed from package");
            window.location.reload();
        } catch (error) {
            console.error("Error removing item from package:", error);
        }
    };

    const handleUpdateClick = async (): Promise<void> => {
        try {
            await updatePackageItemQuantity(item.id, quantity);
            window.location.reload();
        } catch (error) {
            console.error("Error updating package item quantity:", error);
        }
    };

    return (
        <tr>
            <td className="item-image">
                <img
                    src={`http://localhost:3005/images/${item.item.image}`}
                    alt={`Image for ${item.item.name}`}
                />
            </td>
            <td className="item-details-cell">
                <h4>{item.item.name}</h4>
                <p>{item.item.description}</p>
            </td>
            <td>
                <Counter
                    initialValue={quantity}
                    onUpdateCount={(newCount: number) => {
                        setQuantity(newCount);
                        onUpdateQuantity(newCount);
                    }}
                />
            </td>
            <td>
                <div className="action-buttons">
                    <button onClick={handleUpdateClick}>Update</button>
                    <button onClick={() => navigateToInventoryItem(item.item.id)}>
                        View Item
                    </button>
                    <ConfirmationButton
                        confirmationMessage="Remove Item From Package?"
                        buttonText="Remove Item"
                        onConfirm={removeItem}
                    />
                </div>
            </td>
        </tr>
    );
};

export default PackageItemRow;

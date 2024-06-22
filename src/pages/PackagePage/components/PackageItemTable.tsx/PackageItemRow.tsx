import React, { useState } from "react";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton";
import { deletePackageItem, updatePackageItemQuantity } from "../../../../services/item.services";
import { NavigationUtils } from "../../../../utils/navigation.utils.ts";
import { PackageItem } from "../../../../models/item.models";
import Counter from "../../../../components/Counter/Counter";
import ImageWithAlt from "../../../../components/ImageWithAlt/ImageWithAlt";

const PackageItemRow: React.FC<{ item: PackageItem }> = ({ item }) => {
    const { navigateToInventoryItem } = NavigationUtils();
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
                <ImageWithAlt imageName={item.item.image} />
            </td>
            <td className="item-details-cell">
                <h4>{item.item.name}</h4>
                <p>{item.item.description}</p>
            </td>
            <td>
                <Counter
                    initialValue={quantity}
                    onUpdateCount={setQuantity}
                />
            </td>
            <td>
                <div className="action-buttons">
                    <button onClick={handleUpdateClick}>Update</button>
                    <button onClick={() => navigateToInventoryItem(item.item.id)}>View Item</button>
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

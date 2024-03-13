import {PackageItem} from "../../../../models/item.models.ts";
import React from "react";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton.tsx";
import {deletePackageItem} from "../../../../services/item.services.ts";
import {Navigation} from "../../../../utils/navigation.ts";

const PackageItemList: React.FC<{ packageItems: PackageItem[] }> = ({packageItems}) => {
    const {navigateToInventoryItem} = Navigation();


    const removeItem = async (id: number): Promise<void> => {
        try {
            await deletePackageItem(id);
            console.log('Item removed from package');
            window.location.reload();
        } catch (error) {
            console.error('Error removing item from package:', error);
        }
    };


    return (
        <div className="package-list">
            {packageItems.length > 0 ? (
                <ul>
                    {packageItems.map((item: PackageItem) => (
                        <li key={item.id} className="table-row">
                            <div className="item-image-cell">
                                <img
                                    src={`http://localhost:3005/images/${item.item.image}`}
                                    alt={`Image for ${item.item.name}`}
                                    className="item-image"
                                />
                            </div>
                            <div className="item-details-cell">
                                <h4>{item.item.name}</h4>
                                <p>{item.item.description}</p>
                            </div>
                            <div className="action-buttons">
                                <button onClick={() => navigateToInventoryItem(item.item.id)}>
                                    View Item
                                </button>
                                <ConfirmationButton confirmationMessage="Remove Item From Package?"
                                                    buttonText="Remove Item" onConfirm={() => removeItem(item.id)}/>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="no-data-message">
                    <span>No Items in Package</span>
                </div>
            )}
        </div>
    );
}

export default PackageItemList;
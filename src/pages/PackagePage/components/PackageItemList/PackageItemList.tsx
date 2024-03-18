import {PackageItem} from "../../../../models/item.models.ts";
import React from "react";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton.tsx";
import {deletePackageItem} from "../../../../services/item.services.ts";
import {Navigation} from "../../../../utils/navigation.ts";
import './PackageItemList.scss';
import AddPackageItem from "./AddPackageItem.tsx";

const PackageItemList: React.FC<{ packageItems: PackageItem[], packageTypeId: number }> = ({packageItems, packageTypeId}) => {
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
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Items in Package</label>
            </div>
            <div className="panel-content">
                <AddPackageItem packageTypeID={packageTypeId}/>
                {packageItems.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Item</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {packageItems.map((item: PackageItem) => (
                            <tr key={item.id}>
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
                                <td >
                                    <div className="action-buttons">
                                    <button onClick={() => navigateToInventoryItem(item.item.id)}>
                                        View Item
                                    </button>
                                    <ConfirmationButton
                                        confirmationMessage="Remove Item From Package?"
                                        buttonText="Remove Item"
                                        onConfirm={() => removeItem(item.id)}
                                    />
                                    </div>
                                </td>
                            </tr>
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
}

export default PackageItemList;
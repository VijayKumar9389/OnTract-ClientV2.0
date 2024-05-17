import React, { useEffect, useState } from "react";
import { getProjectFromCookie } from "../../../../utils/cookieHelper.ts";
import { getItemsByProjectId, createPackageItem } from "../../../../services/item.services.ts";
import { Item } from "../../../../models/item.models.ts";
import {showToastError} from "../../../../utils/toastHelper.ts";
import {MdAdd} from "react-icons/md";

const AddPackageItem: React.FC<{ packageTypeID: number }> = ({ packageTypeID }) => {
    const [packageItems, setPackageItems] = useState<Item[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const project = getProjectFromCookie();

    // Fetch items by project ID
    useEffect((): void => {
        const fetchItems = async (): Promise<void> => {
            try {
                if (project) {
                    const response: Item[] = await getItemsByProjectId(project.id);
                    setPackageItems(response);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    // Check if an item is selected
    const hasSelectedItemId = (): boolean => {
        return selectedItemId !== null;
    }

    // Add package item
    const handleAddPackageItem = async (): Promise<void> => {
        // Check if an item is selected
        if (selectedItemId !== null) {
            const packageItemData = {
                itemID: selectedItemId,
                packageTypeID: packageTypeID,
                notes: '',
            };
            try {
                // Create package item
                await createPackageItem(packageItemData);
                console.log('Package item added successfully');
                window.location.reload(); // Reload the page after adding the item
            } catch (error) {
                console.error('Error adding package item:', error);
                showToastError('Item already exists for this package type');
            }
        } else {
            console.error('No item selected');
        }
    }

    return (
        <div className="add-item-form">
            <div className="input-wrapper">
                <label>Add Item:</label>
                <div className="submit-wrapper">
                    <select onChange={(e) => setSelectedItemId(parseInt(e.target.value))}>
                        <option value="">Select Item</option>
                        {packageItems.map((item: Item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <button className="add-button" disabled={!hasSelectedItemId()} onClick={handleAddPackageItem}>
                        <MdAdd/>
                        Add Item
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddPackageItem;

import React, {useEffect, useState} from "react";
import {getProjectFromCookie} from "../../../../utils/cookieHelper.ts";
import {getItemsByProjectId} from "../../../../services/item.services.ts";
import {Item} from "../../../../models/item.models.ts";
import {createPackageItem} from "../../../../services/item.services.ts";
import {FaCheck} from "react-icons/fa6";

const AddPackageItem: React.FC<{ packageTypeID: number }> = ({packageTypeID}) => {
    const [packageItems, setItems] = useState<Item[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const project = getProjectFromCookie();


    const fetchItems = async (): Promise<void> => {
        try {
            if (project) {
                const response: Item[] = await getItemsByProjectId(project.id);
                setItems(response);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect((): void => {
        fetchItems().then((): void => {
        });
    }, []);

    const AddPackageItem = async (): Promise<void> => {
        if (selectedItemId !== null) {
            const packageItemData = {
                itemID: selectedItemId,
                packageTypeID: packageTypeID,
                notes: '',
            };
            try {
                await createPackageItem(packageItemData);
                console.log('Package item added successfully');
                window.location.reload(); // Reload the page after adding the item
            } catch (error) {
                console.error('Error adding package item:', error);
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
                    <button className="add-button" onClick={() => AddPackageItem()}>
                        <FaCheck/>
                        Add Item
                    </button>
                </div>
            </div>

        </div>
    );
}

export default AddPackageItem;


import {useParams} from "react-router-dom";
import SubPageHeading from "../../components/SubPageHeading/SubPageHeading.tsx";
import {useEffect, useState} from "react";
import {getItemById} from "../../services/item.services.ts";
import {Item} from "../../models/item.models.ts";
import EditItem from "./components/EditItem/EditItem.tsx";
import {getPackageByPackageItemId} from "../../services/package.services.ts";
import {Package} from "../../models/package.models.ts";
import ItemDeliveryTable from "./components/ItemDeliveryTable.tsx/ItemDeliveryTable.tsx";
import ItemStats from "./components/ItemStats/ItemStats.tsx";
import ConfirmationButton from "../../components/ConfirmationButton/ConfirmationButton.tsx";
import {deleteItem} from "../../services/item.services.ts";
import {showToastError} from "../../utils/toast.utils.ts";

const ItemPage = () => {
    const {id} = useParams();
    const [item, setItem] = useState<Item | null>(null);
    const [packages, setPackages] = useState<Package[] | null>(null);

    useEffect((): void => {
        if (id) {
            const itemId: number = parseInt(id);
            getItemById(itemId)
                .then((response: Item): void => {
                    setItem(response);
                });
            getPackageByPackageItemId(Number(id))
                .then((response: Package[]): void => {
                    setPackages(response);
                });
        }
    }, [id]);

    // Remove item from the database
    const removeItem = async (itemId: number): Promise<void> => {
        try {
            await deleteItem(itemId);
            console.log('Item deleted successfully');
            history.back();
        } catch (error) {
            console.error('Error deleting item:', error);
            showToastError('Cannot delete item associated with packages.')
        }
    };

    if (!item) {
        return <div>Loading...</div>
    }

    return (
        <div className="section">
            <SubPageHeading heading={item.name}/>
            <div className="page-content">
                <ItemStats packages={packages} item={item}/>
                <EditItem item={item}/>
                {packages && <ItemDeliveryTable packages={packages} item={item}/>}
                <div className="btn-container">
                    <ConfirmationButton buttonText="Delete Item"
                                        confirmationMessage="Are you sure you want to delete this Item?"
                                        onConfirm={() => removeItem(item.id)}/>
                </div>
            </div>
        </div>
    );
}

export default ItemPage;
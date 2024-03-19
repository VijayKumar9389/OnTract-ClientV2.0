import {useParams} from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import {useEffect, useState} from "react";
import {getItemById} from "../../services/item.services.ts";
import {Item} from "../../models/item.models.ts";
import EditItem from "./components/EditItem/EditItem.tsx";
import {getPackageByPackageItemId} from "../../services/package.services.ts";
import {Package} from "../../models/package.models.ts";
import PackageItemTable from "./components/PackageItemTable/PackageItemTable.tsx";
import ItemStats from "./components/ItemStats/ItemStats.tsx";
import ConfirmationButton from "../../components/ConfirmationButton/ConfirmationButton.tsx";
import {deleteItem} from "../../services/item.services.ts";
import {showToastError} from "../../utils/toastHelper.ts";

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
                    console.log(response);
                });
        }
    }, [id]);

    const removeItem = async (itemId: number): Promise<void> => {
        try {
            await deleteItem(itemId);
            console.log('Item deleted successfully');
            history.back();
        } catch (error) {
            console.error('Error deleting item:', error);
            showToastError('Error deleting item')
        }
    };

    if (!item) {
        return <div>Loading...</div>
    }

    return (
        <div className="section">
            <PageHeading heading={item.name}/>
            <div className="page-content">
                <ItemStats packages={packages} item={item}/>
                <EditItem item={item}/>
                {packages && <PackageItemTable packages={packages} item={item}/>}
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
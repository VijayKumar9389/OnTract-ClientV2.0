import './ItemPage.scss';
import {useParams} from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import {useEffect, useState} from "react";
import {getItemById} from "../../services/item.services.ts";
import {Item} from "../../models/item.models.ts";
import EditItemForm from "./components/EditItemForm/EditItemForm.tsx";
import {getPackageByPackageItemId} from "../../services/package.services.ts";
import {Package} from "../../models/package.models.ts";
import PackageItemTable from "./components/PackageItemTable/PackageItemTable.tsx";
import ItemStats from "./components/ItemStats/ItemStats.tsx";

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

    if (!item) {
        return <div>Loading...</div>
    }

    return (
        <div className="item-page-container">
            <PageHeading heading={item.name}/>
            <div className="page-content">
                <ItemStats packages={packages} item={item}/>
                <EditItemForm item={item}/>
                {packages !== null && packages.length > 0 && <PackageItemTable packages={packages} item={item} />}
            </div>
        </div>
    );
}

export default ItemPage;
import './ItemPage.scss';
import {useParams} from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import {useEffect, useState} from "react";
import {getItemById} from "../../services/item.services.ts";
import {Item} from "../../models/item.models.ts";

const ItemPage = () => {
    const {id} = useParams();
    const [item, setItem] = useState<Item | null>(null);

    useEffect((): void => {
        if (id) {
            const itemId: number = parseInt(id);
            getItemById(itemId)
                .then((response: Item): void => {
                    setItem(response);
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
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>{item.quantity}</p>
            </div>
        </div>
    );
}

export default ItemPage;
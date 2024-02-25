 import './Inventory.scss';
import {getItemsByProjectId} from "../../services/item.services.ts";
import {useState, useEffect} from "react";
import {Item} from "../../models/item.models.ts";
 import Heading from "../../components/Heading/Heading.tsx";

const Inventory = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect((): void => {
        getItemsByProjectId(1)
            .then((response: Item[]): void => {
                setItems(response);
                console.log(response)
            });
    }, []);

    return (
        <div className="inventory-container">
            <Heading heading="Inventory"/>
            <div className="page-content">
                <div className="btn-container">
                    <button>Add Item</button>
                </div>
                <div className="inventory-list">
                    {items.map((item: Item) => (
                        <div key={item.id}>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default Inventory;
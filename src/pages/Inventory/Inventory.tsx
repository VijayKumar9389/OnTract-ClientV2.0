 import './Inventory.scss';
import {getItemsByProjectId} from "../../services/item.services.ts";
import {useState, useEffect} from "react";
import {Item} from "../../models/item.models.ts";
 import Heading from "../../components/Heading/Heading.tsx";
 import ItemCard from "./components/ItemCard/ItemCard.tsx";
 import {MdAdd} from "react-icons/md";
 import Dialog from "../../components/Dialog/Dialog.tsx";
 import CreateItemForm from "./components/CreateItemForm/CreateItemForm.tsx";

const Inventory = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    }

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
                    <button onClick={toggleModal}><MdAdd />Add Item</button>
                </div>
                <div className="inventory-list">
                    {items.map((item: Item) => (
                        <ItemCard item={item} key={item.id}/>
                    ))}
                </div>
            </div>
            <Dialog isOpen={isModalOpen} toggle={toggleModal} element={<CreateItemForm/>} heading={"Create Item"}/>
        </div>
    );

}

export default Inventory;
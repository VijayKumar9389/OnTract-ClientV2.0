import { useState, useEffect } from 'react';
import { getItemsByProjectId } from '../../services/item.services.ts';
import { Item } from '../../models/item.models.ts';
import Heading from '../../components/Heading/Heading.tsx';
import ItemTable from './components/ItemTable/ItemTable.tsx';
import { MdAdd } from 'react-icons/md';
import Dialog from '../../components/Dialog/Dialog.tsx';
import CreateItemForm from './components/CreateItemForm/CreateItemForm.tsx';
import { getProjectFromCookie } from '../../utils/cookieHelper.ts';
import {FaBoxes} from "react-icons/fa";
import {Project} from "../../models/stakeholder.models.ts";

const Inventory = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const project: Project | null = getProjectFromCookie();

    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            if (!project) return;
            try {
                const response: Item[] = await getItemsByProjectId(project.id);
                setItems(response);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchData()
            .then(() => console.log('Items fetched'));
    }, []);

    return (
        <div className="section">
            <Heading heading="Inventory" />
            <Dialog isOpen={isModalOpen} toggle={toggleModal} element={<CreateItemForm />} heading="Create Item" />
            <div className="page-content">
                <div className="header">
                    <h3>
                        <FaBoxes />
                        ITEMS (<strong>{items.length}</strong>)
                    </h3>
                    <button onClick={toggleModal}>
                        <MdAdd /> Add Item
                    </button>
                </div>
                <ItemTable items={items} />
            </div>
        </div>
    );
};

export default Inventory;

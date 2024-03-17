import { useState, useEffect } from 'react';
import './Inventory.scss';
import { getItemsByProjectId } from '../../services/item.services.ts';
import { Item } from '../../models/item.models.ts';
import Heading from '../../components/Heading/Heading.tsx';
import ItemCard from './components/ItemCard/ItemCard.tsx';
import { MdAdd } from 'react-icons/md';
import Dialog from '../../components/Dialog/Dialog.tsx';
import CreateItemForm from './components/CreateItemForm/CreateItemForm.tsx';
import { getProjectFromCookie } from '../../utils/cookieHelper.ts';

const Inventory = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const project = getProjectFromCookie();

    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            if (!project) return;
            try {
                const response = await getItemsByProjectId(project.id);
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
            <div className="page-content">
                <Dialog isOpen={isModalOpen} toggle={toggleModal} element={<CreateItemForm />} heading="Create Item" />
                <div className="header">
                    <h3>Items ({items.length})</h3>
                    <button onClick={toggleModal}>
                        <MdAdd /> Add Item
                    </button>
                </div>
                {items.length > 0 ? (
                    <div className="inventory-list">
                        {items.map((item: Item) => (
                            <ItemCard item={item} key={item.id} />
                        ))}
                    </div>
                ) : (
                    <div className="no-data-message">
                        <span>No Items Created.</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;

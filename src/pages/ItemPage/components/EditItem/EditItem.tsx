import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaRegSave } from "react-icons/fa";
import { Item, UpdateItemInput } from "../../../../models/item.models.ts";
import { updateItem } from "../../../../services/item.services.ts";
import "./EditItem.scss";
import { showToastError } from "../../../../utils/toast.utils.ts";
import ImageWithAlt from "../../../../components/ImageWithAlt/ImageWithAlt.tsx";

interface EditItemFormProps {
    item: Item;
}

const EditItem: React.FC<EditItemFormProps> = ({ item }) => {
    const [file, setFile] = useState<File | null>(null);
    const [editedItem, setEditedItem] = useState<UpdateItemInput>({
        id: item.id,
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        image: null
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const updatedItem: UpdateItemInput = { ...editedItem };

        console.log('Updated item:', updatedItem);

        try {
            const response = await updateItem(updatedItem.id, updatedItem);
            console.log('Item updated successfully:', response);
            window.location.reload();
        } catch (error) {
            console.error('Error updating item:', error);
            showToastError('Error updating item');
        }
    };

    const hasDataChanged = (): boolean => (
        editedItem.name !== item.name ||
        editedItem.description !== item.description ||
        editedItem.quantity !== item.quantity ||
        file !== null
    );

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setFile(selectedFile || null);
        setEditedItem({ ...editedItem, image: selectedFile });
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    return (
        <form className="form-wrapper" onSubmit={handleSubmit}>
            <div className="form-controls">
                <ImageWithAlt imageName={item.image} />
                <div>
                    <div className="input-wrapper">
                        <label htmlFor="fileInput" className="form-label">File:</label>
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            className="form-control"
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="editName" className="form-label">Name:</label>
                        <input
                            id="editName"
                            type="text"
                            value={editedItem.name}
                            name="name"
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="editDescription" className="form-label">Description:</label>
                        <textarea
                            id="editDescription"
                            value={editedItem.description}
                            name="description"
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="editQuantity" className="form-label">Quantity:</label>
                        <input
                            id="editQuantity"
                            type="number"
                            value={editedItem.quantity}
                            name="quantity"
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <button type="submit" className="form-btn" disabled={!hasDataChanged()}>
                        <FaRegSave />
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditItem;

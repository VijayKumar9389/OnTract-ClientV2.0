import React, {useState, ChangeEvent, FormEvent} from "react";
import {FaRegSave} from "react-icons/fa";
import {Item, UpdateItemInput} from "../../../../models/item.models.ts";
import {updateItem} from "../../../../services/item.services.ts";
import "./EditItemForm.scss";

interface EditItemFormProps {
    item: Item;
}

const EditItemForm: React.FC<EditItemFormProps> = ({item}) => {

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

        const updatedItem: UpdateItemInput = {
            ...editedItem,
        };

        console.log('Updated item:', updatedItem);

        try {
            const response = await updateItem(updatedItem.id, updatedItem);

            console.log('Item updated successfully:', response);
            // Handle the response as needed
        } catch (error) {
            console.error('Error updating item:', error);
            // Handle error
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setFile(selectedFile || null);
        setEditedItem({ ...editedItem, image: selectedFile }); // Update editedItem with the selected file
    };

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = event.target;
        setEditedItem({...editedItem, [name]: value});
    };

    const getDisplayedImage = (): string => {
        if (file) {
            return URL.createObjectURL(file);
        } else if (item.image) {
            return `http://localhost:3005/images/${item.image}`;
        } else {
            return 'https://via.placeholder.com/150';
        }
    };

    return (
        <form className="panel" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="panel-header">
                <label className="panel-label">Edit Item</label>
            </div>

            <div className="panel-content">
                <div className="form-controls">
                    <img
                        src={getDisplayedImage()}
                        alt={`Image for ${item.name}`}
                        className="form-image"
                    />

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

                        <button type="submit" className="form-btn">
                            <FaRegSave/>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );

};

export default EditItemForm;

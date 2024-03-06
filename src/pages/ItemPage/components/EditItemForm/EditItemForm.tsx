import {Item} from "../../../../models/item.models.ts";
import React, {useState} from "react";
import {FaRegSave} from "react-icons/fa";
import './EditItemForm.scss';

interface EditItemFormProps {
    item: Item;
}

const EditItemForm: React.FC<EditItemFormProps> = ({item}) => {
    const [editedItem, setEditedItem] = useState({...item});
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const selectedFile = fileList[0];
            setFile(selectedFile);
            // You can also display a preview of the selected image if needed
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setEditedItem({...editedItem, [name]: value});
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Implement the updateItem function
    };

    // const deleteItem = () => {
    //     // Implement the deleteItem function
    // };

    const getDisplayedImage = () => {
        if (file) {
            // If a new file is selected, display its preview
            return URL.createObjectURL(file);
        } else if (item && item.image) {
            // If no new file is selected, display the existing item image
            return `http://localhost:3005/images/${item.image}`;
        } else {
            // Provide a default image URL or return null if no image is available
            return 'https://via.placeholder.com/150'; // Example default image URL
        }
    };

    return (
        <form className="panel" onSubmit={handleSubmit}>
            <div className="panel-header">
                <label className="panel-label">Edit Item</label>
            </div>

            <div className="panel-content">
                <div className="form-controls">

                    <img
                        src={getDisplayedImage()}
                        alt={`Image for ${item.name}`}
                        className="item-image"
                    />

                    <div>
                        <div className="input-wrapper">
                            <label htmlFor="fileInput" className="form-label">
                                File:
                                <input
                                    type="file"
                                    id="fileInput"
                                    onChange={handleFileChange}
                                    className="form-control"
                                />
                            </label>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="editName" className="form-label">
                                Name:
                                <input
                                    id="editName"
                                    type="text"
                                    value={item.name}
                                    name="name"
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </label>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="editDescription" className="form-label">
                                Description:
                                <textarea
                                    id="editDescription"
                                    value={item.description}
                                    name="description"
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </label>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="editQuantity" className="form-label">
                                Quantity:
                                <input
                                    id="editQuantity"
                                    type="number"
                                    value={item.quantity}
                                    name="quantity"
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </label>
                        </div>

                        <div className="btn-container">
                            <button type="submit" className="btn btn-primary">
                                <FaRegSave/>Save
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </form>
    );
}

export default EditItemForm;
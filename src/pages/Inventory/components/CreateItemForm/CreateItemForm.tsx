import React, { useEffect, useState } from "react";
import { createItem} from "../../../../services/item.services.ts";
import "./CreateItemForm.scss";
import {NewItemInput} from "../../../../models/item.models.ts";
import {getProjectFromCookie} from "../../../../utils/project.helper.ts";

const CreateItemForm = () => {
    const project = getProjectFromCookie();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [quantity, setQuantity] = useState<number>(1); // Initial quantity
    const [projectId, setProjectId] = useState<number | null>(null);



    useEffect((): void => {
        if (project) {
            setProjectId(project.id);
        }
    }, [project]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "quantity") {
            setQuantity(parseInt(value));
        } else if (name === "projectId") {
            setProjectId(parseInt(value));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            // Create FormData
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            if (image) {
                formData.append('image', image);
            }
            formData.append('quantity', quantity.toString());
            if (projectId) {
                formData.append('projectId', projectId.toString());
            }

            // Convert FormData to CreateItemDTO
            const createItemDTO: NewItemInput = {
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                image: formData.get('image') as File | null,
                projectId: parseInt(formData.get('projectId') as string, 10),
                quantity: parseInt(formData.get('quantity') as string, 10)
            };

            await createItem(createItemDTO);
            // Handle success, redirect, or show a message
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div className="create-item-form">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="input-wrapper">
                    <label htmlFor="name">
                        Name
                        <input type="text" id="name" name="name" value={name} onChange={handleChange} />
                    </label>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="description">
                        Description
                        <textarea id="description" name="description" value={description} onChange={handleChange}></textarea>
                    </label>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="image">
                        Image
                        <input type="file" id="image" name="image" onChange={handleFileChange} />
                    </label>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="quantity">
                        Quantity
                        <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleChange} />
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );

}

export default CreateItemForm;

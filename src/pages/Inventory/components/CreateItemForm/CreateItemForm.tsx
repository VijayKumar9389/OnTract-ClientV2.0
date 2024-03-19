import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {createItem} from "../../../../services/item.services.ts";
import {NewItemInput} from "../../../../models/item.models.ts";
import {getProjectFromCookie} from "../../../../utils/cookieHelper.ts";
import {FaBox} from "react-icons/fa";
import {showToastError} from "../../../../utils/toastHelper.ts";

const CreateItemForm: React.FC = () => {
    const project = getProjectFromCookie();
    const [formData, setFormData] = useState<NewItemInput>({
        name: '',
        description: '',
        image: null,
        quantity: 1,
        projectId: null
    });

    // Set the project ID in the form data
    useEffect((): void => {
        if (project) {
            setFormData(prevState => ({
                ...prevState,
                projectId: project.id
            }));
        }
    }, []);

    // Handle form input change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "quantity" ? parseInt(value, 10) : value
        }));
    };

    // Handle file change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData(prevState => ({
            ...prevState,
            image: file
        }));
    };

    // Check if the form is valid
    const isFormValid = (): boolean => {
        return formData.name !== '' && formData.description !== '' && formData.image !== null && formData.quantity > 0;
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!project) {
            console.error('Project not found');
            return;
        }
        try {
            await createItem(formData);
            window.location.reload();
            // Handle success, redirect, or show a message
        } catch (error) {
            console.error('Error creating item:', error);
            showToastError('Failed to create item');
            // Handle error
        }
    };

    return (
        <div className="create-item-form">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="input-wrapper">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" name="image" onChange={handleFileChange}/>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange}/>
                </div>

                <button type="submit" disabled={!isFormValid()} className="form-btn">
                    <FaBox />
                    Create Item
                </button>
            </form>
        </div>
    );

};

export default CreateItemForm;

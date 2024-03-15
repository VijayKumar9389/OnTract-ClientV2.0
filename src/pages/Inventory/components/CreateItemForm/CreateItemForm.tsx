import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {createItem} from "../../../../services/item.services.ts";
import "./CreateItemForm.scss";
import {NewItemInput} from "../../../../models/item.models.ts";
import {getProjectFromCookie} from "../../../../utils/cookieHelper.ts";

const CreateItemForm: React.FC = () => {
    const project = getProjectFromCookie();
    const [formData, setFormData] = useState<NewItemInput>({
        name: '',
        description: '',
        image: null,
        quantity: 1,
        projectId: null
    });

    useEffect((): void => {
        if (project) {
            setFormData(prevState => ({
                ...prevState,
                projectId: project.id
            }));
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "quantity" ? parseInt(value, 10) : value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData(prevState => ({
            ...prevState,
            image: file
        }));
    };

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
            // Handle error
        }
    };

    return (
        <div className="create-item-form">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="input-wrapper">
                    <label htmlFor="name">
                        Name
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
                    </label>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="description">
                        Description
                        <textarea id="description" name="description" value={formData.description}
                                  onChange={handleChange}></textarea>
                    </label>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="image">
                        Image
                        <input type="file" id="image" name="image" onChange={handleFileChange}/>
                    </label>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="quantity">
                        Quantity
                        <input type="number" id="quantity" name="quantity" value={formData.quantity}
                               onChange={handleChange}/>
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateItemForm;

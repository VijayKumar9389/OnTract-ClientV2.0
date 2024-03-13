import React, {useState} from "react";
import {createPackageType} from "../../../../services/package.services.ts";
import {getProjectFromCookie} from "../../../../utils/project.helper.ts";

const CreatePackageTypeForm: React.FC = () => {
    // Define state variables to hold form data
    const project = getProjectFromCookie();
    const [formData, setFormData] = useState({
        name: "",
        notes: ""
    });

    // Define a function to handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!project) return;

        try {
            // Call the API to create a package type
            const createdPackageType = await createPackageType(formData, project.id);
            console.log('Package Type created:', createdPackageType);
            window.location.reload();
            // Optionally, you can reset the form after a successful submission
            setFormData({name: "", notes: ""});
        } catch (error) {
            // Handle error
            console.error('Error creating package type:', error);
        }
    };

    // Define a function to handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="name">Name:
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
            </div>

            <div className="input-wrapper">
                <label htmlFor="notes">Notes:
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        required
                    />
                </label>
            </div>


            <button type="submit">Create</button>
        </form>
    );
}

export default CreatePackageTypeForm;

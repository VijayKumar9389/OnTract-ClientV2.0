import React, { useEffect, useState } from 'react';
import './EditDeliveryForm.scss';
import { FaRegSave } from 'react-icons/fa';
import { Delivery, EditDeliveryDTO } from '../../../../models/delivery.models';
import { editDelivery } from '../../../../services/delivery.services';

const EditDeliveryForm: React.FC<{ delivery: Delivery }> = ({ delivery }) => {
    const [formData, setFormData] = useState<EditDeliveryDTO>({
        route: '',
        destination: '',
        delivery_method: '',
        notes: '',
    });

    useEffect(() => {
        if (delivery) {
            setFormData({
                route: delivery.route,
                destination: delivery.destination,
                delivery_method: delivery.delivery_method,
                notes: delivery.notes,
            });
        }
    }, [delivery]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!delivery) {
            console.error('Delivery is not available');
            return;
        }

        try {
            const updatedDelivery: Delivery = await editDelivery(delivery.id, formData);
            console.log('Delivery updated:', updatedDelivery);
            // Optionally, provide feedback to the user (e.g., show a success message)
            window.location.reload(); // Reload the page after successful update (consider alternatives like updating state instead)
        } catch (error) {
            console.error('Error updating delivery:', error);
            // Optionally, provide feedback to the user (e.g., show an error message)
        }
    };

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">EDIT DELIVERY</label>
            </div>
            <form className="panel-content" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label>
                        Route:
                        <input type="text" id="route" name="route" value={formData.route} onChange={handleChange}/>
                    </label>
                </div>
                <div className="input-wrapper">
                    <label>
                        Destination:
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="input-wrapper">
                    <label>
                        Delivery Type:
                        <select
                            name="delivery_method"
                            value={formData.delivery_method}
                            onChange={handleChange}
                        >
                            <option value="mail">Mail</option>
                            <option value="person">Person</option>
                        </select>

                    </label>
                </div>
                <div className="input-wrapper">
                    <label>
                        Notes:
                        <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange}/>
                    </label>
                </div>
                <button type="submit">
                    <FaRegSave/>
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditDeliveryForm;

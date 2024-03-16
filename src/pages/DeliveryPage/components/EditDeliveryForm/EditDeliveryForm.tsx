import React, { useEffect, useState } from 'react';
import { FaRegSave } from 'react-icons/fa';
import { Delivery, EditDeliveryDTO } from '../../../../models/delivery.models';
import { editDelivery } from '../../../../services/delivery.services';
import './EditDeliveryForm.scss';

const EditDeliveryForm: React.FC<{ delivery: Delivery }> = ({ delivery }) => {
    const [formData, setFormData] = useState<EditDeliveryDTO>({
        route: '',
        destination: '',
        delivery_method: 'mail', // Renamed from delivery_method to deliveryMethod
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
            // Consider updating the UI instead of reloading the entire page
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
                    <label htmlFor="route">Route:</label>
                    <input type="text" id="route" name="route" value={formData.route} onChange={handleChange} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="destination">Destination:</label>
                    <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="deliveryMethod">Delivery Type:</label>
                    <select name="deliveryMethod" value={formData.delivery_method} onChange={handleChange}>
                        <option value="mail">Mail</option>
                        <option value="person">Person</option>
                    </select>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="notes">Notes:</label>
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} />
                </div>
                <button type="submit" className="form-btn">
                    <FaRegSave />
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditDeliveryForm;

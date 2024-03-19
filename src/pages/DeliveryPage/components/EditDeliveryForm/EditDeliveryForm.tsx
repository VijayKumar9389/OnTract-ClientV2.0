import React, { useEffect, useState } from 'react';
import { FaRegSave } from 'react-icons/fa';
import { Delivery, UpdateDeliveryInput } from '../../../../models/delivery.models';
import { editDelivery } from '../../../../services/delivery.services';

const EditDeliveryForm: React.FC<{ delivery: Delivery }> = ({ delivery }) => {
    const [formData, setFormData] = useState<UpdateDeliveryInput>({
        route: '',
        destination: '',
        delivery_method: 'mail', // Renamed from delivery_method to deliveryMethod
        notes: '',
    });

    useEffect((): void => {
        if (delivery) {
            setFormData({
                route: delivery.route,
                destination: delivery.destination,
                delivery_method: delivery.delivery_method === 'mail' ? 'mail' : 'person',
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
            window.location.reload();
        } catch (error) {
            console.error('Error updating delivery:', error);
        }
    };

    const hasDataChanged: boolean = formData.route !== delivery.route || formData.destination !== delivery.destination || formData.delivery_method !== delivery.delivery_method || formData.notes !== delivery.notes;

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
                    <label htmlFor="delivery_method">Delivery Type:</label>
                    <select name="delivery_method" value={formData.delivery_method} onChange={handleChange}>
                        <option value="mail">Mail</option>
                        <option value="person">Person</option>
                    </select>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="notes">Notes:</label>
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} />
                </div>
                <button type="submit" disabled={!hasDataChanged} className="form-btn">
                    <FaRegSave />
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditDeliveryForm;

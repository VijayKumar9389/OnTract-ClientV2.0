import React, {useState, useEffect} from 'react';
import './EditDeliveryForm.scss';
import {Delivery} from "../../../../models/delivery.models.ts";
import { FaRegSave} from "react-icons/fa";

export interface EditDeliveryDTO {
    route: string;
    destination: string;
    delivery_method: string;
    notes: string;
    status: string;
    date: string;
}

const EditDeliveryForm: React.FC<{ delivery: Delivery }> = ({delivery}) => {

    const [formData, setFormData] = useState<EditDeliveryDTO>({
        route: '',
        destination: '',
        delivery_method: '',
        notes: '',
        status: 'pending',
        date: ''
    });

    useEffect((): void => {
        if (delivery) {
            setFormData({
                route: delivery.route,
                destination: delivery.destination,
                delivery_method: delivery.delivery_method,
                notes: delivery.notes,
                status: delivery.status,
                date: delivery.date
            });
        }
    }, [delivery]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">EDIT DELIVERY</label>
            </div>
            <form className="panel-content">
                <div className="input-wrapper">
                    <label>
                        Route:
                        <input type="text" id="route" name="route" value={formData.route} onChange={handleChange}/>
                    </label>
                </div>
                <div className="input-wrapper">
                    <label>
                        Destination:
                        <input type="text" id="destination" name="destination" value={formData.destination}
                               onChange={handleChange}/>
                    </label>
                </div>
                <div className="input-wrapper">
                    <label>
                        Delivery Method:
                        <input type="text" id="delivery_method" name="delivery_method" value={formData.delivery_method}
                               onChange={handleChange}/>
                    </label>
                </div>
                <div className="input-wrapper">
                    <label>
                        Notes:
                        <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange}/>
                    </label>
                </div>
                <button><FaRegSave/>Save</button>
            </form>
        </div>
    );
};

export default EditDeliveryForm;
import React, { useState } from 'react';
import { Project, Stakeholder } from '../../../../models/stakeholder.models.ts';
import { createDelivery } from '../../../../services/delivery.services.ts';
import { NewDeliveryInput } from '../../../../models/delivery.models.ts';
import { getProjectFromCookie } from '../../../../utils/cookie.utils.ts';
import { FaTruck } from 'react-icons/fa';
import {useGetPackageTypesByProjectID} from "../../../../hooks/package.hooks.ts";
import {showToastError} from "../../../../utils/toast.utils.ts";

interface CreateDeliveryForm {
    delivery_method: string;
    route: string;
    destination: string;
    notes: string;
    packageTypeId: number;
}

const CreateDeliveryForm: React.FC<{ stakeholder: Stakeholder }> = ({ stakeholder }) => {
    const initialState: CreateDeliveryForm = {
        delivery_method: '',
        route: '',
        destination: '',
        notes: '',
        packageTypeId: 0,
    };

    const [destinationOptions, setDestinationOptions] = useState<number>(0);
    const [createDeliveryForm, setCreateDeliveryForm] = useState<CreateDeliveryForm>(initialState);
    const project: Project | null = getProjectFromCookie();
    const { packageTypes, loading, error } = useGetPackageTypesByProjectID();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCreateDeliveryForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const addressAvailable = () => {
        return (
            (stakeholder.mailingAddress && createDeliveryForm.delivery_method === 'mail') ||
            (stakeholder.streetAddress && createDeliveryForm.delivery_method === 'person')
        );
    };

    const handleDeliveryMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setCreateDeliveryForm((prevForm) => ({
            ...prevForm,
            delivery_method: value,
            destination: '', // Clear the destination
        }));
        setDestinationOptions(0); // Reset destination options to custom
    };

    const getAvailableAddresses = () => {
        return createDeliveryForm.delivery_method === 'mail' ? stakeholder.mailingAddress : stakeholder.streetAddress;
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const destinationValue = destinationOptions === 0 ? createDeliveryForm.destination : getAvailableAddresses();

        if (project !== null) {
            const createDeliveryDTO: NewDeliveryInput = {
                packageTypeId: Number(createDeliveryForm.packageTypeId),
                delivery_method: createDeliveryForm.delivery_method,
                route: createDeliveryForm.route,
                destination: destinationValue,
                notes: createDeliveryForm.notes,
                projectId: project.id,
                stakeholderId: stakeholder.id,
            };

            try {
                await createDelivery(createDeliveryDTO);
                console.log('Form submitted:', createDeliveryDTO);
                window.location.reload();
            } catch (error) {
                console.error('Error submitting form:', error);
                showToastError('Error creating delivery')
            }
        }
    };

    if (loading) return <div className="loading-message">Loading package types...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!packageTypes) return <div className="error-message">No package types found</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="packageTypeId">Package Type ID:</label>
                <select
                    id="packageTypeId"
                    name="packageTypeId"
                    value={createDeliveryForm.packageTypeId}
                    onChange={handleInputChange}
                >
                    <option value={0}>Select Package Type</option>
                    {packageTypes.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="input-wrapper">
                <label htmlFor="deliveryMethod">Delivery Type:</label>
                <select
                    id="deliveryMethod"
                    name="delivery_method"
                    value={createDeliveryForm.delivery_method}
                    onChange={handleDeliveryMethodChange}
                >
                    <option value="">Select a Delivery Method</option>
                    <option value="mail">Mail</option>
                    <option value="person">Person</option>
                </select>
            </div>

            <div className="input-wrapper">
                <label htmlFor="notes">Notes:</label>
                <textarea id="notes" name="notes" value={createDeliveryForm.notes} onChange={handleInputChange}/>
            </div>

            <div className="input-wrapper">
                <label htmlFor="route">Route:</label>
                <input type="text" id="route" name="route" value={createDeliveryForm.route}
                       onChange={handleInputChange}/>
            </div>

            <div className="input-wrapper">
                <label htmlFor="deliveryType">Destination Options:</label>
                <select
                    id="deliveryType"
                    name="deliveryType"
                    onChange={(e) => setDestinationOptions(Number(e.target.value))}
                >
                    <option value={0}>Custom</option>
                    {addressAvailable() && <option value={1}>Current Location</option>}
                </select>
            </div>


            {destinationOptions === 0 && createDeliveryForm.delivery_method !== '' && (
                <div className="input-wrapper">
                    <label htmlFor="destination">Destination:</label>
                    <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={createDeliveryForm.destination}
                        onChange={handleInputChange}
                    />
                </div>
            )}

            {destinationOptions === 1 && (
                <div className="input-wrapper">
                    <label htmlFor="destination">Destination:</label>
                    <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={getAvailableAddresses()}
                        readOnly // Set readOnly attribute to true
                    />
                </div>
            )}


            <button type="submit" className="form-btn" >
                <FaTruck/>
                Create Delivery
            </button>
        </form>
    );
};

export default CreateDeliveryForm;

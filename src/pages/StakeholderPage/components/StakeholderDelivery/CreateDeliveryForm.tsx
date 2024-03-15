import React, {useEffect, useState} from 'react';
import {PackageType} from '../../../../models/package.models.ts';
import {Project, Stakeholder} from '../../../../models/stakeholder.models.ts';
import {createDelivery} from '../../../../services/delivery.services.ts';
import {getPackageTypesByProjectId} from "../../../../services/package.services.ts";
import {NewDeliveryInput} from "../../../../models/delivery.models.ts";
import {getProjectFromCookie} from "../../../../utils/cookieHelper.ts";

interface CreateDeliveryForm {
    delivery_method: string;
    route: string;
    destination: string;
    notes: string;
    packageTypeId: number;
}

const CreateDeliveryForm: React.FC<{ stakeholder: Stakeholder }> = ({stakeholder}) => {
    const initialState = {
        delivery_method: '',
        route: '',
        destination: '',
        notes: '',
        packageTypeId: 0,
    };

    const [destinationOptions, setDestinationOptions] = useState<number>(0);
    const [createDeliveryForm, setCreateDeliveryForm] = useState<CreateDeliveryForm>(initialState);
    const [packageTypeOptions, setPackageTypeOptions] = useState<PackageType[]>([]);
    const project: Project | null = getProjectFromCookie();

    useEffect(() => {
        if (!project)
            return;
        const fetchPackageTypes = async (): Promise<void> => {
            try {
                const packageTypes = await getPackageTypesByProjectId(project.id);
                setPackageTypeOptions(packageTypes);
            } catch (error) {
                console.error('Error fetching package types:', error);
            }
        };
        fetchPackageTypes()
            .then(() => console.log('Package types fetched'))
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setCreateDeliveryForm((prevForm) => ({...prevForm, [name]: value}));
    };

    const addressAvailable = () => {
        return (
            (stakeholder.mailingAddress && createDeliveryForm.delivery_method === 'mail') ||
            (stakeholder.streetAddress && createDeliveryForm.delivery_method === 'inPerson')
        );
    };

    const getAvailableAddresses = () => {
        return createDeliveryForm.delivery_method === 'mail' ? stakeholder.mailingAddress : stakeholder.streetAddress || '';
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
            }
        }
    };

    return (

        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label>
                    Package Type ID:
                    <select name="packageTypeId" value={createDeliveryForm.packageTypeId} onChange={handleInputChange}>
                        <option value="">Select Package Type</option>
                        {packageTypeOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="input-wrapper">
                <label>
                    Delivery Type:
                    <select name="delivery_method" value={createDeliveryForm.delivery_method}
                            onChange={handleInputChange}>
                        <option value="">Select a Delivery Method</option>
                        <option value="mail">Mail</option>
                        <option value="person">Person</option>
                    </select>
                </label>
            </div>

            <div className="input-wrapper">
                <label>
                    Notes:
                    <textarea name="notes" value={createDeliveryForm.notes} onChange={handleInputChange}/>
                </label>
            </div>

            <div className="input-wrapper">
                <label>
                    Route:
                    <input type="text" name="route" value={createDeliveryForm.route} onChange={handleInputChange}/>
                </label>
            </div>

            <div className="input-wrapper">
                <label>
                    Destination Options:
                    <select name="deliveryType" onChange={(e) => setDestinationOptions(Number(e.target.value))}>
                        <option value={0}>Custom</option>
                        {addressAvailable() && <option value={1}>Current</option>}
                    </select>
                </label>
            </div>

            {destinationOptions === 0 && createDeliveryForm.delivery_method !== "" && (
                <div className="input-wrapper">
                    <label>
                        Destination:
                        <input
                            type="text"
                            name="destination"
                            value={createDeliveryForm.destination}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
            )}

            {destinationOptions === 1 && <h1>{getAvailableAddresses()}</h1>}

            <button type="submit"
                    disabled={!createDeliveryForm.packageTypeId || !createDeliveryForm.delivery_method || !createDeliveryForm.route}>
                Submit
            </button>
        </form>
    );
};

export default CreateDeliveryForm;

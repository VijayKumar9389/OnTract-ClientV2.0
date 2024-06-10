import React, {useState, useEffect} from 'react';
import {createPackageForExistingDelivery} from '../../../../services/package.services.ts';
import {getPackageTypesByProjectId} from '../../../../services/package.services.ts';
import {getDeliveriesByProjectID} from '../../../../services/delivery.services.ts';
import {NewPackageInput, PackageType} from '../../../../models/package.models.ts';
import {Delivery} from '../../../../models/delivery.models.ts';
import {Project, Stakeholder} from '../../../../models/stakeholder.models.ts';
import {getProjectFromCookie} from '../../../../utils/cookie.utils.ts';
import {FaBoxesPacking} from "react-icons/fa6";

interface PackageFormProps {
    stakeholder: Stakeholder;
}

const PackageForm: React.FC<PackageFormProps> = ({stakeholder}) => {
    const [packageTypes, setPackageTypes] = useState<PackageType[]>([]);
    const [deliveryOptions, setDeliveryOptions] = useState<Delivery[]>([]);
    const [selectedPackageTypeId, setSelectedPackageTypeId] = useState<number>(0);
    const [selectedDeliveryId, setSelectedDeliveryId] = useState<number>(0);
    const project: Project | null = getProjectFromCookie();

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                if (project) {
                    const packageTypesResponse: PackageType[] = await getPackageTypesByProjectId(project.id);
                    const deliveriesResponse: Delivery[] = await getDeliveriesByProjectID(project.id);
                    setPackageTypes(packageTypesResponse);
                    setDeliveryOptions(deliveriesResponse);
                }
            } catch (error) {
                console.error('Error fetching package and delivery data:', error);
            }
        }

        fetchData();
    }, []); // Added project as dependency for useEffect

    const formIsValid: boolean = selectedPackageTypeId !== 0 && selectedDeliveryId !== 0;

    const handleDeliverySelection = (deliveryId: number) => {
        setSelectedDeliveryId(deliveryId);
    };

    const isRowSelected = (deliveryId: number): boolean => {
        return selectedDeliveryId === deliveryId;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newPackageData: NewPackageInput = {
            packageTypeId: selectedPackageTypeId,
            deliveryId: selectedDeliveryId,
            stakeholderId: stakeholder.id,
        };

        try {
            await createPackageForExistingDelivery(newPackageData);
            console.log('PackageTypeGrid created successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error creating package:', error);
            // Optionally, add logic to handle error (e.g., show an error message to the user)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="package-form">
            <div className="input-wrapper">
                <label>Select Package Type:</label>
                <select value={selectedPackageTypeId}
                        onChange={(e) => setSelectedPackageTypeId(parseInt(e.target.value))}>
                    <option value="">Select a package type</option>
                    {packageTypes.map((packageType) => (
                        <option key={packageType.id} value={packageType.id}>
                            {packageType.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input-wrapper">
                <label>Select Delivery:</label>
                <div className="table-wrapper">
                    <table className="select-table">
                        <thead>
                        <tr>
                            <th>Destination</th>
                            <th>Stakeholders</th>
                        </tr>
                        </thead>
                        <tbody>
                        {deliveryOptions.map((delivery) => (
                            <tr key={delivery.id} className={isRowSelected(delivery.id) ? "selected" : ""} onClick={() => handleDeliverySelection(delivery.id)}>
                                <td>{delivery.destination}</td>
                                <td>
                                    <ul>
                                        {delivery.packages.map((pkg) => (
                                            <li key={pkg.id}>
                                                {pkg.stakeholder.name}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button type="submit" className="form-btn" disabled={!formIsValid}>
                <FaBoxesPacking/>
                Create Package
            </button>
        </form>
    );
};

export default PackageForm;

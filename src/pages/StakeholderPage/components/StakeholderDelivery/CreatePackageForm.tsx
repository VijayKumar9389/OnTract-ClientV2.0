import React, {useState, useEffect} from 'react';
import {createPackageForExistingDelivery} from "../../../../services/package.services.ts";
import {getPackageTypesByProjectId} from "../../../../services/package.services.ts";
import {getDeliveriesByProjectID} from "../../../../services/delivery.services.ts";
import {NewPackageInput, PackageType} from "../../../../models/package.models.ts";
import {Delivery} from "../../../../models/delivery.models.ts";
import {Project, Stakeholder} from "../../../../models/stakeholder.models.ts";
import {getProjectFromCookie} from "../../../../utils/cookieHelper.ts";

interface PackageFormProps {
    stakeholder: Stakeholder;
}

const PackageForm = ({stakeholder}: PackageFormProps) => {
    const [packageTypes, setPackageTypes] = useState<PackageType[]>([]);
    const [deliveryOptions, setDeliveryOptions] = useState<Delivery[]>([]);
    const [selectedPackageTypeId, setSelectedPackageTypeId] = useState<string>('');
    const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>('');
    const project: Project | null = getProjectFromCookie();

    useEffect((): void => {
        async function fetchPackageData(): Promise<void> {
            if (!project) return;
            try {
                const packageTypesResponse: PackageType[] = await getPackageTypesByProjectId(project.id);
                const deliveriesResponse: Delivery[] = await getDeliveriesByProjectID(project.id);

                setPackageTypes(packageTypesResponse);
                setDeliveryOptions(deliveriesResponse);
            } catch (error) {
                console.error('Error fetching package data:', error);
            }
        }

        fetchPackageData();
    }, [project]);

    const formIsValid: boolean = selectedPackageTypeId !== '' && selectedDeliveryId !== '';

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const packageData: NewPackageInput = {
            packageTypeId: selectedPackageTypeId,
            deliveryId: selectedDeliveryId,
            stakeholderId: stakeholder.id.toString(),
        };

        try {
            await createPackageForExistingDelivery(packageData);
            console.log('Package created successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error creating package:', error);
            // Optionally, add logic to handle error (e.g., show an error message to the user)
        }
    };


    return (
        <form onSubmit={handleSubmit} className="package-form">
            <div className="input-wrapper">
                <label>
                    Select Package Type:
                    <select value={selectedPackageTypeId} onChange={(e) => setSelectedPackageTypeId(e.target.value)}>
                        <option value="">Select a package type</option>
                        {packageTypes.map((packageType) => (
                            <option key={packageType.id} value={packageType.id}>
                                {packageType.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="input-wrapper">
                <label>
                    Select Delivery:
                    <select value={selectedDeliveryId} onChange={(e) => setSelectedDeliveryId(e.target.value)}>
                        <option value="">Select a delivery</option>
                        {deliveryOptions.map((delivery) => (
                            <option key={delivery.id} value={delivery.id}>
                                {delivery.destination}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {formIsValid
                ? <button type="submit">Create Package</button>
                : <button className="disabled">Create Package</button>
            }
        </form>
    );
};

export default PackageForm;

import React, { useState } from 'react';
import { useGetPackageTypesByProjectID } from '../../../../../hooks/package.hooks.ts';
import { useGetDeliveriesByProjectID } from '../../../../../hooks/delivery.hooks.ts';
import { createPackageForExistingDelivery } from '../../../../../services/package.services.ts';
import { NewPackageInput } from '../../../../../models/package.models.ts';
import { Stakeholder } from '../../../../../models/stakeholder.models.ts';
import { FaBoxesPacking } from 'react-icons/fa6';
import SelectPackageType from './SelectPackageType.tsx';
import DeliveryTable from './DeliveryTable.tsx';

const PackageForm: React.FC<{ stakeholder: Stakeholder }> = ({ stakeholder }) => {
    const { packageTypes, loading: loadingPackageTypes, error: errorPackageTypes } = useGetPackageTypesByProjectID();
    const { deliveries, loading: loadingDeliveries, error: errorDeliveries } = useGetDeliveriesByProjectID();

    const [selectedPackageTypeId, setSelectedPackageTypeId] = useState<number>(0);
    const [selectedDeliveryId, setSelectedDeliveryId] = useState<number>(0);

    const formIsValid: boolean = selectedPackageTypeId !== 0 && selectedDeliveryId !== 0;

    const handleDeliverySelection = (deliveryId: number): void => {
        setSelectedDeliveryId(deliveryId);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const newPackageData: NewPackageInput = {
            packageTypeId: selectedPackageTypeId,
            deliveryId: selectedDeliveryId,
            stakeholderId: stakeholder.id,
        };

        try {
            await createPackageForExistingDelivery(newPackageData);
            console.log('Package created successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error creating package:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="package-form">
            {errorPackageTypes && <div className="error-message">{errorPackageTypes}</div>}
            {errorDeliveries && <div className="error-message">{errorDeliveries}</div>}
            {loadingPackageTypes || loadingDeliveries ? (
                <div className="loading-message">Loading...</div>
            ) : (
                <>
                    <SelectPackageType
                        packageTypes={packageTypes}
                        selectedPackageTypeId={selectedPackageTypeId}
                        setSelectedPackageTypeId={setSelectedPackageTypeId}
                    />
                    <DeliveryTable
                        deliveries={deliveries}
                        selectedDeliveryId={selectedDeliveryId}
                        handleDeliverySelection={handleDeliverySelection}
                    />
                    <button type="submit" className="form-btn" disabled={!formIsValid}>
                        <FaBoxesPacking />
                        Create Package
                    </button>
                </>
            )}
        </form>
    );
};

export default PackageForm;

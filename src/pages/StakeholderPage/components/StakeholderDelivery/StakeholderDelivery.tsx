import React, { useState } from 'react';
import { useGetDeliveryByPackageID } from '../../../../hooks/delivery.hooks.ts';
import CreateDeliveryForm from './CreateDeliveryForm.tsx';
import CreatePackageForm from './CreatePackageForm/CreatePackageForm.tsx';
import DeliveryDetails from './DeliveryDetails.tsx';
import { Stakeholder } from '../../../../models/stakeholder.models.ts';
import SubMenu from '../../../../components/SubMenu/SubMenu.tsx';

interface StakeholderDeliveryProps {
    packageId: number;
    stakeholder: Stakeholder;
}

const StakeholderDelivery: React.FC<StakeholderDeliveryProps> = ({ packageId, stakeholder }) => {
    const { delivery, error, loading } = useGetDeliveryByPackageID(packageId);
    const [deliveryType, setDeliveryType] = useState<string>('create');

    const handleSelect = (type: string): void => {
        setDeliveryType(type);
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="panel">
            <div className="panel-header">
                <h3 className="panel-heading">Delivery Details</h3>
            </div>
            <div className="panel-content">
                {!delivery ? (
                    <>
                        <SubMenu
                            items={[
                                { label: 'Create Delivery', value: 'create' },
                                { label: 'Add To Delivery', value: 'plan' }
                            ]}
                            selected={deliveryType}
                            onSelect={handleSelect}
                        />
                        {deliveryType === 'create' ? (
                            <CreateDeliveryForm stakeholder={stakeholder} />
                        ) : (
                            <CreatePackageForm stakeholder={stakeholder} />
                        )}
                    </>
                ) : (
                    <DeliveryDetails delivery={delivery} />
                )}
            </div>
        </div>
    );
};

export default StakeholderDelivery;
import React, {useState, useEffect} from 'react';
import {getDeliveryByPackageId} from '../../../../services/delivery.services.ts';
import {Delivery} from '../../../../models/delivery.models.ts';
import CreateDeliveryForm from './CreateDeliveryForm.tsx';
import CreatePackageForm from './CreatePackageForm.tsx';
import DeliveryDetails from './DeliveryDetails.tsx';
import {Stakeholder} from "../../../../models/stakeholder.models.ts";

const StakeholderDelivery: React.FC<{ packageId: number; stakeholder: Stakeholder }> = ({packageId, stakeholder}) => {
    const [delivery, setDelivery] = useState<Delivery | null>(null);
    const [deliveryType, setDeliveryType] = useState<string>('create');

    const toggleDeliveryType = (type: string): void => {
        setDeliveryType(type);
    };

    useEffect((): void => {
        if (!packageId) return;
        getDeliveryByPackageId(packageId)
            .then((response: Delivery): void => {
                setDelivery(response);
            })
            .catch((error): void => {
                console.error('Error fetching delivery:', error);
            });
    }, [packageId]);

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Delivery Details</label>
            </div>
            {!delivery && (
                <div className="submenu">
                    <div
                        className={`submenu-item ${deliveryType === 'create' ? 'selected' : ''}`}
                        onClick={() => toggleDeliveryType('create')}
                    >
                        Create Delivery
                    </div>
                    <div
                        className={`submenu-item ${deliveryType === 'plan' ? 'selected' : ''}`}
                        onClick={() => toggleDeliveryType('plan')}
                    >
                        Add To Delivery
                    </div>
                </div>
            )}
            <div className="panel-content">
                {delivery ? (
                    <DeliveryDetails delivery={delivery}/>
                ) : (
                    <>
                        {deliveryType !== 'create' ? (
                            <CreatePackageForm stakeholder={stakeholder}/>
                        ) : (
                            <CreateDeliveryForm stakeholder={stakeholder}/>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default StakeholderDelivery;

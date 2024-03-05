import './StakeholderDelivery.scss';
import React, {useState, useEffect} from 'react';
import {getDeliveryByPackageId} from "../../../../services/delivery.services.ts";
import {Delivery} from "../../../../models/delivery.models.ts";
import {Package} from "../../../../models/package.models.ts";
import {FaArrowRight, FaBox, FaUser} from "react-icons/fa";
import CreateDeliveryForm from "./CreateDeliveryForm.tsx";
import {Stakeholder} from "../../../../models/stakeholder.models.ts";
import CreatePackageForm from "./CreatePackageForm.tsx";

const StakeholderDelivery: React.FC<{ packageId: number, stakeholder: Stakeholder }> = ({packageId, stakeholder}) => {

    const [delivery, setDelivery] = useState<Delivery | null>(null);
    const [deliveryType, setDeliveryType] = useState<string>('create');

    const toggleDeliveryType = (type: string): void => {
        setDeliveryType(type);
    };

    useEffect((): void => {
        getDeliveryByPackageId(packageId)
            .then((response: Delivery): void => {
                setDelivery(response);
            });
    }, [packageId]);

    if (!packageId) return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Delivery Details</label>
            </div>
            <div className="panel-content">
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

                {deliveryType !== 'create' ? (
                    <CreatePackageForm stakeholder={stakeholder}/>
                ) : (
                    <CreateDeliveryForm stakeholder={stakeholder} />
                )}
            </div>
        </div>
    );

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Delivery Details</label>
            </div>
            <div className="panel-content">
                <div className="card-header">
                    <h3 className="popup-header">{delivery?.destination}</h3>
                    <p>{delivery?.notes}</p>
                </div>
                <table className="package-table">
                    <tbody className="details">
                    {delivery?.packages?.map((deliveryPackage: Package) => (
                        <tr key={deliveryPackage.id} className="package-item">
                            <td>
                                <FaBox className="icon"/>
                                <span>{deliveryPackage.packageType.name}</span>
                            </td>
                            <td>
                                <FaArrowRight className="arrow-icon"/>
                                <strong>To</strong>
                            </td>
                            <td>
                                <FaUser className="user-icon"/>
                                <span className="delivery-list-name">{deliveryPackage.stakeholder.name}</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StakeholderDelivery;
import React, { useState } from "react";
import { Package } from "../../../../models/package.models.ts";
import { Item } from "../../../../models/item.models.ts";
import { NavigationUtils } from "../../../../utils/navigation.utils.ts";
import SubMenu from "../../../../components/SubMenu/SubMenu.tsx";
import NoDataMessage from "../../../../components/NoDataMessage/NoDataMessage.tsx";
import {useDispatch} from "react-redux";

const PackageItemTable: React.FC<{ packages: Package[], item: Item }> = ({ packages, item }) => {
    const { navigateToPackage, navigateToStakeholder, navigateToDelivery } = NavigationUtils();
    const dispatch = useDispatch();
    const [deliveryType, setDeliveryType] = useState('All'); // State to track the selected delivery type

    // Function to toggle delivery type
    const toggleDeliveryType = (type: string): void => {
        setDeliveryType(type);
    };

    // Filter packages based on delivery type
    const filteredPackages: Package[] = deliveryType === 'Completed' ?
        packages.filter((deliveryPackage: Package) => deliveryPackage.delivery.completed) :
        deliveryType === 'Pending' ?
            packages.filter((deliveryPackage: Package) => !deliveryPackage.delivery.completed) :
            packages;

    console.log(filteredPackages[0].packageType.items)

    return (
        <div className="panel">
            <div className="panel-header">
                <h3>Scheduled Items</h3>
            </div>
            <div className="panel-content">
                {/* Delivery Status Submenu */}
                <SubMenu
                    items={[
                        { label: 'All', value: 'All' },
                        { label: 'Completed', value: 'Completed' },
                        { label: 'Pending', value: 'Pending' }
                    ]}
                    selected={deliveryType}
                    onSelect={toggleDeliveryType}
                />
                {/* Item Table */}
                {filteredPackages.length > 0 ? (
                    <div className="table-wrapper">
                        <table className="package-table">
                            <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Package</th>
                                <th>Stakeholder</th>
                                <th>Delivery Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody className="details">
                            {filteredPackages.map((deliveryPackage: Package) => {
                                console.log(deliveryPackage);
                                const packageItem = deliveryPackage.packageType.items.find(packageItem => packageItem.item.id === item.id);
                                console.log(packageItem);
                                const quantity = packageItem ? packageItem.quantity : 0;

                                return (
                                    <tr key={deliveryPackage.id} className="package-item">
                                        <td><span>{item.name}</span></td>
                                        <td><span>{quantity}</span></td>
                                        <td><span>{deliveryPackage.packageType.name}</span></td>
                                        <td><span>{deliveryPackage.stakeholder.name}</span></td>
                                        <td>
                                                <span className="delivery-list-name">
                                                    {deliveryPackage.delivery.completed
                                                        ? <a className="chip green">Completed</a>
                                                        : <a className="chip red">Pending</a>
                                                    }
                                                </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button onClick={() => navigateToPackage(deliveryPackage.packageType.id)}>View Package</button>
                                                <button onClick={() => navigateToStakeholder(deliveryPackage.stakeholder.id, dispatch)}>View Stakeholder</button>
                                                <button onClick={() => navigateToDelivery(deliveryPackage.deliveryId, dispatch)}>View Delivery</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <NoDataMessage message="No scheduled items found." />
                )}
            </div>
        </div>
    );
}

export default PackageItemTable;

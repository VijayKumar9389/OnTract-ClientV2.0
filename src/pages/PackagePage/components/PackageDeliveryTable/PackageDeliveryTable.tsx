import React, {useState} from "react";
import {Package} from "../../../../models/package.models.ts";
import {NavigationUtils} from "../../../../utils/navigation.utils.ts";
import SubMenu from "../../../../components/SubMenu/SubMenu.tsx";

const PackageDeliveryTable: React.FC<{ packages: Package[] }> = ({packages}) => {
    const {navigateToStakeholder, navigateToDelivery} = NavigationUtils();
    const [deliveryStatus, setDeliveryStatus] = useState('All'); // State to track selected delivery status

    // Function to toggle delivery status
    const toggleDeliveryStatus = (status: string): void => {
        setDeliveryStatus(status);
    };

    // Filter packages based on delivery status
    const filteredPackages: Package[] = deliveryStatus === 'Completed' ?
        packages.filter((deliveryPackage: Package) => deliveryPackage.delivery.completed) :
        deliveryStatus === 'Pending' ?
            packages.filter((deliveryPackage: Package) => !deliveryPackage.delivery.completed) :
            packages;

    return (
        <div className="panel">
            <div className="panel-header">
                <h3>Scheduled Packages</h3>
            </div>
            <div className="panel-content">

                {/* Delivery Status Submenu */}
                <SubMenu
                    items={[
                        { label: 'All', value: 'All' },
                        { label: 'Completed', value: 'Completed' },
                        { label: 'Pending', value: 'Pending' }
                    ]}
                    selected={deliveryStatus}
                    onSelect={toggleDeliveryStatus}
                />

                {/* PackageTypeGrid Table */}
                {filteredPackages.length > 0 ? (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                            <tr>
                                <th>Package</th>
                                <th>Stakeholder</th>
                                <th>Delivery Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredPackages.map((deliveryPackage: Package) => (
                                <tr key={deliveryPackage.id} className="package-item">
                                    <td><span>{deliveryPackage.packageType.name}</span></td>
                                    <td><span className="delivery-list-name">{deliveryPackage.stakeholder.name}</span>
                                    </td>
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
                                            <button onClick={() => navigateToDelivery(deliveryPackage.deliveryId)}>View
                                                Delivery
                                            </button>
                                            <button
                                                onClick={() => navigateToStakeholder(deliveryPackage.stakeholder.id)}>View
                                                Stakeholder
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                ) : (
                    <div className="no-data-message">
                        <span>No Packages Scheduled.</span>
                    </div>
                )}
            </div>
        </div>
    )
};

export default PackageDeliveryTable;

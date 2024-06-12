import React, {useEffect, useState} from 'react';
import {changePackagePackageType} from '../../../../services/package.services.ts';
import {NavigationUtils} from '../../../../utils/navigation.utils.ts';
import ImageWithAlt from '../../../../components/ImageWithAlt/ImageWithAlt.tsx';
import {useGetPackageTypesByProjectID} from "../../../../hooks/package.hooks.ts";
import {PackageType} from "../../../../models/package.models.ts";
import {PackageItem} from "../../../../models/item.models.ts";

const ChangePackage: React.FC<{ packageType: PackageType, packageId: number }> = ({packageType, packageId}) => {
    const {packageTypes, loading, error} = useGetPackageTypesByProjectID();
    const [selectedPackageTypeId, setSelectedPackageTypeId] = useState<string>(String(packageType.id));
    const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
    const {navigateToPackage, navigateToInventoryItem} = NavigationUtils();

    useEffect(() => {
        if (!loading && !error && packageTypes) {
            const selectedPackageType = packageTypes.find((type) => type.id.toString() === selectedPackageTypeId);
            setSelectedPackage(selectedPackageType || null);
        }
    }, [selectedPackageTypeId, packageTypes, loading, error]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (selectedPackage === null) return;
            const packageTypeId: number = parseInt(selectedPackageTypeId, 10);
            await changePackagePackageType(packageId, packageTypeId);
            console.log('PackageTypeGrid type changed successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error changing package type:', error);
            // Handle error
        }
    };

    return (
        <div>
            {/* Header and Button Section */}
            {selectedPackage && (
                <div className="card-header">
                    {/* Header content */}
                    <h3>{selectedPackage.name}</h3>
                    <p>{selectedPackage.notes}</p>
                </div>
            )}

            {/* Form Section */}
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    {/* Dropdown to select package type */}
                    <label>Select Package Type:</label>
                    <div className="submit-wrapper">
                        <select value={selectedPackageTypeId}
                                onChange={(e) => setSelectedPackageTypeId(e.target.value)}>
                            {packageTypes &&
                                packageTypes.map((packageType) => (
                                    <option key={packageType.id} value={String(packageType.id)}>
                                        {packageType.name}
                                    </option>
                                ))}
                        </select>
                        {/* Button to submit form */}
                        <button type="submit">Change Package</button>
                    </div>
                </div>
            </form>

            {/* Table Section */}
            {selectedPackage && (
                <table>
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedPackage.items.map((item: PackageItem) => (
                        <tr key={item.id}>
                            <td className="item-image">
                                {/* Image component */}
                                <ImageWithAlt imageName={item.item.image}/>
                            </td>
                            <td>{item.item.name}</td>
                            <td>{item.item.description}</td>
                            <td>
                                {/* Button to view inventory item */}
                                <button onClick={() => navigateToInventoryItem(item.item.id)}>View Item</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Button to view package */}
            <div className="btn-container">
                <button onClick={() => navigateToPackage(packageType.id)}>View Package</button>
            </div>
        </div>
    );
};

export default ChangePackage;

import React, { useEffect, useState } from 'react';
import { getPackageTypesByProjectId, changePackagePackageType } from '../../../../services/package.services.ts';
import { getProjectFromCookie } from '../../../../utils/cookieHelper.ts';
import { PackageType } from '../../../../models/package.models.ts';
import { Project } from '../../../../models/stakeholder.models.ts';
import ImageWithAlt from "../../../../components/ImageWithAlt/ImageWithAlt.tsx";

const ChangePackage: React.FC<{ packageType: PackageType, packageId: number }> = ({ packageType , packageId}) => {
    const [packageTypes, setPackageTypes] = useState<PackageType[]>([]);
    const [selectedPackageTypeId, setSelectedPackageTypeId] = useState<string>(String(packageType.id));
    const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
    const project: Project | null = getProjectFromCookie();

    useEffect(() => {
        async function fetchPackageData(): Promise<void> {
            try {
                if (!project) return;
                const packageTypesResponse: PackageType[] = await getPackageTypesByProjectId(project.id);
                setPackageTypes(packageTypesResponse);
            } catch (error) {
                console.error('Error fetching package data:', error);
            }
        }
        fetchPackageData()
            .then(() => console.log('Package data fetched'));
    }, []);

    useEffect(() => {
        const selectedPackageType = packageTypes.find((type) => type.id.toString() === selectedPackageTypeId);
        setSelectedPackage(selectedPackageType || null);
    }, [selectedPackageTypeId, packageTypes]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (selectedPackage === null) return;
            const packageTypeId: number = parseInt(selectedPackageTypeId, 10);
            await changePackagePackageType(packageId, packageTypeId);
            console.log('Package type changed successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error changing package type:', error);
            // Handle error
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label>Select Package Type:</label>
                    <div className="submit-wrapper">
                        <select value={selectedPackageTypeId} onChange={(e) => setSelectedPackageTypeId(e.target.value)}>
                            {packageTypes.map((packageType) => (
                                <option key={packageType.id} value={String(packageType.id)}>
                                    {packageType.name}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Change Package</button>
                    </div>
                </div>
            </form>
            {selectedPackage && (
                <div>
                    <div className="header">
                        <div className="card-header">
                            <h3>{selectedPackage.name}</h3>
                            <p>{selectedPackage.notes}</p>
                        </div>
                        <button>View Package</button>
                    </div>
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
                        {selectedPackage.items.map((item) => (
                            <tr key={item.id}>
                                <td className="item-image">
                                    <ImageWithAlt imageName={item.item.image} />
                                </td>
                                <td>{item.item.name}</td>
                                <td>{item.item.description}</td>
                                <td><button>View Item</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ChangePackage;

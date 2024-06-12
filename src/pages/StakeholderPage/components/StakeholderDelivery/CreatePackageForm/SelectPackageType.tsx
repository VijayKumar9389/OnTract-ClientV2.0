import React from 'react';
import { PackageType } from '../../../../../models/package.models.ts';

interface SelectPackageTypeProps {
    packageTypes: PackageType[] | null;
    selectedPackageTypeId: number;
    setSelectedPackageTypeId: (id: number) => void;
}

const SelectPackageType: React.FC<SelectPackageTypeProps> = ({ packageTypes, selectedPackageTypeId, setSelectedPackageTypeId }) => (
    <div className="input-wrapper">
        <label>Select Package Type:</label>
        <select
            value={selectedPackageTypeId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedPackageTypeId(parseInt(e.target.value))}
            disabled={!packageTypes || packageTypes.length === 0}
        >
            <option value="">Select a package type</option>
            {packageTypes && packageTypes.map((packageType: PackageType) => (
                <option key={packageType.id} value={packageType.id}>
                    {packageType.name}
                </option>
            ))}
        </select>
    </div>
);

export default SelectPackageType;

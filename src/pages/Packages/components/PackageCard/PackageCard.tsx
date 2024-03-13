// PackageCard.tsx
import { FiPackage } from 'react-icons/fi';
import {PackageType} from "../../../../models/package.models.ts";
import {Navigation} from "../../../../utils/navigation.ts";
import './PackageCard.scss';

const PackageCard: React.FC<{packageType: PackageType}> = ({ packageType }) => {
    const {navigateToPackage} = Navigation();

    return (
        <li className="package-card" onClick={() => navigateToPackage(packageType.id)}>
            <div className="package-img-wrapper">
                <FiPackage className="package-icon" />
            </div>
            <div className="card-header">
                <h3>{packageType.name}</h3>
                <p>{packageType.notes}</p>
                <p>{packageType.items.length} Items</p>
            </div>
        </li>
    );
}

export default PackageCard;

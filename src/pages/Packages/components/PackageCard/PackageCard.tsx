// PackageCard.tsx
import { FiPackage } from 'react-icons/fi';
import {PackageType} from "../../../../models/package.models.ts";
import {useNavigate} from "react-router-dom";
import './PackageCard.scss';

const PackageCard: React.FC<{packageType: PackageType}> = ({ packageType }) => {

    const navigate = useNavigate();
    const selectPackage = (id: number): void => {
        navigate(`/packages/${id}`);
    }

    return (
        <li className="package-card" onClick={() => selectPackage(packageType.id)}>
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

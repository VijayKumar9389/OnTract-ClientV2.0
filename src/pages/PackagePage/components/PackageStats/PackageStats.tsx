import './PackageStats.scss';
import {Package} from "../../../../models/package.models.ts";

const PackageStats: React.FC<{ packages: Package[] }> = ({packages}) => {
    // get the number of packages that have a completed delivery
    const completedDeliveries = packages.filter((deliveryPackage: Package) => deliveryPackage.delivery.completed);

    //get the number of packages that have a pending delivery
    const pendingDeliveries = packages.filter((deliveryPackage: Package) => !deliveryPackage.delivery.completed);

    return (
        <div className="package-stats">
            <p className="info-list">
                Scheduled: <span className="info-item">{packages.length}</span>
                <span className="separator">|</span>
                Completed: <span className="info-item">{completedDeliveries.length}</span>
                <span className="separator">|</span>
                Pending: <span className="info-item">{pendingDeliveries.length}</span>
            </p>
        </div>
    );
}

export default PackageStats;

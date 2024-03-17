import './PackageStats.scss';
import {Package} from "../../../../models/package.models.ts";

const PackageStats: React.FC<{ packages: Package[] }> = ({packages}) => {
    // get the number of packages that have a completed delivery
    const completedDeliveries = packages.filter((deliveryPackage: Package) => deliveryPackage.delivery.completed);

    //get the number of packages that have a pending delivery
    const pendingDeliveries = packages.filter((deliveryPackage: Package) => !deliveryPackage.delivery.completed);

    return (
        <div className="project-statistics">
            <div className="statistic-item">
                <span className="label">Scheduled:</span>
                <span className="value">{packages.length}</span>
            </div>
            <div className="statistic-item">
                <span className="label">Completed:</span>
                <span className="value">{completedDeliveries.length}</span>
            </div>
            <div className="statistic-item">
                <span className="label">Pending:</span>
                <span className="value">{pendingDeliveries.length}</span>
            </div>
        </div>
    );

}

export default PackageStats;

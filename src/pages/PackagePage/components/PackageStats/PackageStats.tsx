// components/PackageStats/PackageStats.tsx
import React from "react";
import { Package } from "../../../../models/package.models.ts";
import {Stat} from "../../../../models/report.model.ts";

const PackageStats: React.FC<{ packages: Package[] }> = ({ packages }) => {

    // get the number of packages that have a completed delivery
    const completedDeliveries: Package[] = packages.filter((pkg: Package) => pkg.delivery.completed);

    // get the number of packages that have a pending delivery
    const pendingDeliveries: Package[] = packages.filter((pkg: Package) => !pkg.delivery.completed);

    const stats: Stat[] = [
        { label: 'Scheduled', value: packages.length },
        { label: 'Delivered', value: completedDeliveries.length },
        { label: 'Pending', value: pendingDeliveries.length },
    ];

    return (
        <div className="stats-wrapper">
            {stats.map((stat: Stat, index: number) => (
                <div key={index} className="stat-item">
                    <p>{stat.label}:</p>
                    <h3>{stat.value}</h3>
                </div>
            ))}
        </div>
    );
}

export default PackageStats;

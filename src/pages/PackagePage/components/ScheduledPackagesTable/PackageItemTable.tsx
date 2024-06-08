import React from "react";
import {PackageItem} from "../../../../models/item.models.ts";
import PackageItemRow from "./PackageItemRow.tsx";
import "./PackageItemTable.scss";
import AddPackageItem from "./AddPackageItem.tsx";

const PackageItemTable: React.FC<{
    packageItems: PackageItem[];
    packageTypeId: number;
}> = ({packageItems, packageTypeId}) => {

    return (
        <div className="panel">
            <div className="panel-header">
                <h3>Package Items</h3>
            </div>
            <div className="panel-content">
                <AddPackageItem packageTypeID={packageTypeId}/>
                {packageItems.length > 0 ? (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th>Item</th>
                                <th>In Package</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {packageItems.map((item: PackageItem) => (
                                <PackageItemRow
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="no-data-message">
                        <span>No Items in Package</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PackageItemTable;

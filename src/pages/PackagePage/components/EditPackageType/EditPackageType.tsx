import './EditPackageType.scss';
import {PackageType} from "../../../../models/package.models.ts";
import EditPackageNotes from "./EditPackageNotes.tsx";
import AddPackageItem from "./AddPackageItem.tsx";
import PackageItemList from "./PackageItemList.tsx";

const EditPackageType: React.FC<{ packageType: PackageType }> = ({packageType}) => {

    return (
        <>
            <div className="panel">
                <div className="panel-header">
                    <label className="panel-label">Package Details</label>
                </div>
                <div className="panel-content">
                    <EditPackageNotes packageType={packageType}/>

                </div>
            </div>

            <div className="panel">
                <div className="panel-header">
                    <label className="panel-label">Package Items</label>
                </div>
                <div className="panel-content">
                    <AddPackageItem packageTypeID={packageType.id}/>
                    <PackageItemList packageItems={packageType.items}/>
                </div>
            </div>
        </>
    );
}

export default EditPackageType;
import './PackageList.scss';
import {PackageType} from "../../../../models/package.models.ts";
import {MdAdd} from "react-icons/md";
import PackageCard from "../PackageCard/PackageCard.tsx";
import {useState} from "react";
import Dialog from "../../../../components/Dialog/Dialog.tsx";
import CreatePackageTypeForm from "../CreatePackageTypeForm/CreatePackageTypeForm.tsx";

const PackageList: React.FC<{ packageTypes: PackageType[] }> = ({packageTypes}) => {

    const [isOpened, setIsOpened] = useState(false);

    const toggleModal = (): void => {
        setIsOpened(!isOpened);
    }

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Package List</label>
            </div>
            <div className="panel-content">
                <Dialog isOpen={isOpened} toggle={toggleModal} heading="Create Package Type"
                        element={<CreatePackageTypeForm/>}/>
                <div className="btn-container">
                    <button onClick={() => toggleModal()}>
                        <MdAdd/> Add Package
                    </button>
                </div>
                {packageTypes && packageTypes.length > 0 ? (
                    <ul>
                        {packageTypes?.map((packageType: PackageType) => (
                            <PackageCard packageType={packageType} key={packageType.id}/>
                        ))}
                    </ul>
                ) : (
                    <div className="no-data-message">
                        <span>No Packages Created.</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PackageList;
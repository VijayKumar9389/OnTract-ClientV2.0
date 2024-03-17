import {useEffect, useState} from "react";
import Heading from "../../components/Heading/Heading.tsx";
import {getPackageTypesByProjectId} from "../../services/package.services.ts";
import {PackageType} from "../../models/package.models.ts";
import {getProjectFromCookie} from "../../utils/cookieHelper.ts";
import Dialog from "../../components/Dialog/Dialog.tsx";
import CreatePackageTypeForm from "./components/CreatePackageTypeForm/CreatePackageTypeForm.tsx";
import {MdAdd} from "react-icons/md";
import PackageCard from "./components/PackageCard/PackageCard.tsx";
import './Packages.scss';

const Packages = () => {
    const [packageTypes, setPackageTypes] = useState<PackageType[] | null>(null);
    const project = getProjectFromCookie();
    const [isOpened, setIsOpened] = useState(false);

    const toggleModal = (): void => {
        setIsOpened(!isOpened);
    }

    useEffect(() => {
        if (!project) return;
        const fetchPackageTypes = async () => {
            try {
                const response = await getPackageTypesByProjectId(project.id);
                setPackageTypes(response);
            } catch (error) {
                console.error("Error fetching package types:", error);
            }
        };
        fetchPackageTypes();
    }, [project]);

    if (!packageTypes) {
        return <div>Loading...</div>;
    }

    return (
        <div className="section">
            <Heading heading="Packages"/>
            <div className="page-content">
                <Dialog isOpen={isOpened} toggle={toggleModal} heading="Create Package Type"
                        element={<CreatePackageTypeForm/>}/>
                <div className="header">
                    <h3>Package Types ({packageTypes.length})</h3>
                    <button onClick={toggleModal}>
                        <MdAdd/> Add Package
                    </button>
                </div>
                {packageTypes.length > 0 ? (
                    <div className="package-list">
                        {packageTypes.map((packageType: PackageType) => (
                            <PackageCard packageType={packageType} key={packageType.id}/>
                        ))}
                    </div>
                ) : (
                    <div className="no-data-message">
                        <span>No Packages Created.</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Packages;

import {useEffect, useState} from "react";
import Heading from "../../components/Heading/Heading.tsx";
import {getPackageTypesByProjectId} from "../../services/package.services.ts";
import {PackageType} from "../../models/package.models.ts";
import {getProjectFromCookie} from "../../utils/cookieHelper.ts";
import Dialog from "../../components/Dialog/Dialog.tsx";
import CreatePackageTypeForm from "./components/CreatePackageTypeForm/CreatePackageTypeForm.tsx";
import {MdAdd} from "react-icons/md";
import PackageTypeTable from "./components/PackageTypeTable/PackageTypeTable.tsx";
import {FaBox} from "react-icons/fa";

const Packages = () => {

    const [packageTypes, setPackageTypes] = useState<PackageType[] | null>(null);
    const project = getProjectFromCookie();
    const [isOpened, setIsOpened] = useState(false);

    const toggleModal = (): void => {
        setIsOpened(!isOpened);
    }

    useEffect((): void => {
        if (!project) return;
        const fetchPackageTypes = async (): Promise<void> => {
            try {
                const response: PackageType[] = await getPackageTypesByProjectId(project.id);
                setPackageTypes(response);
            } catch (error) {
                console.error("Error fetching package types:", error);
            }
        };
        fetchPackageTypes()
            .then(() => console.log("Package types fetched successfully"));
    }, []);

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
                    <h3><FaBox/> PACKAGE TYPES ( <strong>{packageTypes.length}</strong> )</h3>
                    <button onClick={toggleModal}>
                        <MdAdd/> Add Package
                    </button>
                </div>
                <PackageTypeTable packageTypes={packageTypes}/>
            </div>
        </div>
    );
}

export default Packages;

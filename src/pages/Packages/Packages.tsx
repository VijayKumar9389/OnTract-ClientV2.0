// Packages.tsx
import { useState } from "react";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import Dialog from "../../components/Dialog/Dialog";
import CreatePackageTypeForm from "./components/CreatePackageTypeForm/CreatePackageTypeForm";
import { MdAdd } from "react-icons/md";
import PackageTypeTable from "./components/PackageTypeTable/PackageTypeTable";
import { useFetchPackageTypes} from "../../hooks/package.hooks.ts";

const Packages: React.FC = () => {
    const { packageTypes, loading, error } = useFetchPackageTypes();
    const [isOpened, setIsOpened] = useState(false);

    const toggleModal = (): void => {
        setIsOpened(!isOpened);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="section">
            <PageHeading heading="Packages" />
            <div className="page-content">
                <Dialog isOpen={isOpened} toggle={toggleModal} heading="Create Package Type" element={<CreatePackageTypeForm />} />
                <div className="header">
                    <h3>PACKAGE TYPES <strong>{packageTypes?.length}</strong></h3>
                    <button className="add-button" onClick={toggleModal}>
                        <MdAdd /> Add Package
                    </button>
                </div>
                {packageTypes && <PackageTypeTable packageTypes={packageTypes} />}
            </div>
        </div>
    );
};

export default Packages;

import {useState} from "react";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import Dialog from "../../components/Dialog/Dialog";
import CreatePackageTypeForm from "./components/CreatePackageTypeForm/CreatePackageTypeForm";
import {MdAdd} from "react-icons/md";
import {useFetchPackageTypes} from "../../hooks/package.hooks.ts";
import PackageTypeGrid from "./components/PackageTypeGrid/PackageTypeGrid.tsx";

const Packages: React.FC = () => {
    const {packageTypes, loading, error} = useFetchPackageTypes();
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
            <PageHeading heading="Packages"/>
            <div className="page-content">
                <div className="sub-header">
                    <button onClick={toggleModal}>
                        <MdAdd/>
                        Add Package
                    </button>
                    <p>Results: <strong>{packageTypes?.length}</strong></p>
                </div>
                {packageTypes && <PackageTypeGrid packageTypes={packageTypes}/>}
                <Dialog
                    isOpen={isOpened}
                    toggle={toggleModal}
                    heading="Create Package Type"
                    element={<CreatePackageTypeForm/>}
                />
            </div>
        </div>
    );
};

export default Packages;

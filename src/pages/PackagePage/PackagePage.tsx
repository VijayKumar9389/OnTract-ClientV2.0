import SubPageHeading from "../../components/SubPageHeading/SubPageHeading.tsx";
import {useParams} from "react-router-dom";
import {getPackageTypeById} from "../../services/package.services.ts";
import {useEffect, useState} from "react";
import {Package, PackageType} from "../../models/package.models.ts";
import EditPackageType from "./components/EditPackageType/EditPackageType.tsx";
import PackageDeliveryTable from "./components/PackageDeliveryTable/PackageDeliveryTable.tsx";
import {getPackageByPackageTypeId} from "../../services/package.services.ts";
import ConfirmationButton from "../../components/ConfirmationButton/ConfirmationButton.tsx";
import {deletePackageType} from "../../services/package.services.ts";
import PackageStats from "./components/PackageStats/PackageStats.tsx";
import PackageItemTable from "./components/ScheduledPackagesTable/PackageItemTable.tsx";
import {showToastError} from "../../utils/toastHelper.ts";

const PackagePage = () => {
    const {id} = useParams();
    const [packageType, setPackageType] = useState<PackageType | null>(null);
    const [packages, setPackages] = useState<Package[]>([]);

    useEffect((): void => {
        if (id) {
            getPackageTypeById(Number(id))
                .then((response: PackageType): void => {
                    setPackageType(response);
                });
            getPackageByPackageTypeId(Number(id))
                .then((response: Package[]): void => {
                    setPackages(response);
                });
        }
    }, [id]);

    const removePackageType = async (packageTypeId: number): Promise<void> => {
        try {
            await deletePackageType(packageTypeId);
            console.log('Package type deleted successfully');
            history.back();
        } catch (error) {
            console.error('Error deleting package type:', error);
            showToastError('Unable to delete the package type. Please ensure all deliveries associated with this package type are cancelled before attempting to delete it.')
        }
    }

    if (!packageType) {
        return <div>Loading...</div>
    }

    return (
        <div className="section">
            <SubPageHeading heading={packageType?.name}/>
            <div className="page-content">
                <PackageStats packages={packages}/>
                <EditPackageType packageType={packageType}/>
                <PackageItemTable packageTypeId={packageType.id} packageItems={packageType.items}/>
                <PackageDeliveryTable packages={packages}/>
                <div className="btn-container">
                    <ConfirmationButton
                        buttonText="Delete Package Type"
                        confirmationMessage={`Are you sure you want to delete ${packageType.name}?`}
                        onConfirm={() => removePackageType(packageType.id)}/>
                </div>
            </div>
        </div>
    );
}

export default PackagePage;
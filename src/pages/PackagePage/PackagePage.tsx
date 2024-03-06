import './PackagePage.scss';
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import {useParams} from "react-router-dom";
import {getPackageTypeById} from "../../services/package.services.ts";
import {useEffect, useState} from "react";
import {Package, PackageType} from "../../models/package.models.ts";
import EditPackageType from "./components/EditPackageType/EditPackageType.tsx";
import PackageDeliveryTable from "./components/PackageDeliveryTable/PackageDeliveryTable.tsx";
import {getPackageByPackageTypeId} from "../../services/package.services.ts";

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



    if (!packageType) {
        return <div>Loading...</div>
    }

    return (
        <div className="package-page-container">
           <PageHeading heading={packageType?.name}/>
            <div className="page-content">
                <EditPackageType packageType={packageType} />
                <PackageDeliveryTable packages={packages} />
            </div>
        </div>
    );
}

export default PackagePage;
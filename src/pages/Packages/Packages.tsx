import Heading from "../../components/Heading/Heading.tsx";
import {getPackageTypesByProjectId} from "../../services/package.services.ts";
import {useEffect, useState} from "react";
import {PackageType} from "../../models/package.models.ts";
import {getProjectFromCookie} from "../../utils/project.helper.ts";
import {Project} from "../../models/stakeholder.models.ts";
import './Packages.scss';
import PackageList from "./components/PackageList/PackageList.tsx";


const Packages = () => {
    const [packageTypes, setPackageTypes] = useState<PackageType[] | null>(null);
    const project: Project | null = getProjectFromCookie();

    useEffect((): void => {
        if (!project) return;
        getPackageTypesByProjectId(project.id)
            .then((response: PackageType[]): void => {
                setPackageTypes(response);
            });
    }, []);

    if (!packageTypes) {
        return <div>Loading...</div>
    }

    return (
        <div className="packages-container">
            <Heading heading="Packages"/>
            <div className="page-content">
                <PackageList packageTypes={packageTypes}/>
            </div>
        </div>
    );
}

export default Packages;
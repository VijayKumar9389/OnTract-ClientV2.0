import Heading from "../../components/Heading/Heading.tsx";
import {getPackageTypesByProjectId} from "../../services/package.services.ts";
import {useEffect, useState} from "react";
import {PackageType} from "../../models/package.models.ts";
import {getProjectFromCookie} from "../../utils/project.helper.ts";
import {Project} from "../../models/stakeholder.models.ts";
import './Packages.scss';
import {useNavigate} from "react-router-dom";


const Packages = () => {
    const [packageTypes, setPackageTypes] = useState<PackageType[] | null>(null);
    const project: Project | null = getProjectFromCookie();
    const navigate = useNavigate();

    useEffect((): void => {
        if (!project) return;
        getPackageTypesByProjectId(project.id)
            .then((response: PackageType[]): void => {
                setPackageTypes(response);
            });
    }, []);

    const selectPackage = (id: number): void => {
        navigate(`/packages/${id}`);
    }

    return (
        <div className="packages-container">
            <Heading heading="Packages"/>
            <div className="page-content">
                <ul>
                    {packageTypes?.map((packageType: PackageType) => (
                        <li className="package-card" key={packageType.id} onClick={() => selectPackage(packageType.id)}>
                            <div className="card-header">
                                <h3>{packageType.name}</h3>
                                <p>{packageType.notes}</p>
                                <p>{packageType.items.length} Items</p>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>

        </div>
    );
}

export default Packages;
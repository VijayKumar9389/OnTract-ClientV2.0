import './Stakeholders.scss';
import { getStakeholdersByProjectId } from "../../services/stakeholder.services.ts";
import { useEffect, useState } from "react";
import { Stakeholder } from "../../models/stakeholder.models.ts";
import StakeholderCard from "./components/StakeholderCard/StakeholderCard.tsx";
import StakeholderInput from "./components/StakeholderInput/StakeholderInput.tsx";
import StakeholderStats from "./components/StakeholderStats/StakeholderStats.tsx";
import Heading from "../../components/Heading/Heading.tsx";
import { getProjectFromCookie } from "../../utils/cookieHelper.ts";

const Stakeholders = () => {
    const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const project = getProjectFromCookie();

    const fetchStakeholders = async (): Promise<void> => {
        if (!project) {
            return;
        }
        try {
            setLoading(true);
            const fetchedStakeholders: Stakeholder[] = await getStakeholdersByProjectId(project.id);
            setStakeholders(fetchedStakeholders);
        } catch (error) {
            setError('Failed to fetch stakeholders');
        } finally {
            setLoading(false);
        }
    };

    useEffect((): void => {
        fetchStakeholders();
    }, []); // Add project as a dependency to trigger re-fetching when it changes

    return (
        <div className="stakeholders-container">
            <Heading heading="Stakeholders"/>
            <div className="page-content">
                {/* Conditionally render loading message */}
                {loading && <p>Loading...</p>}

                {/* Conditionally render error message */}
                {error && <p>{error}</p>}

                {/* Render stakeholders if no loading or error */}
                {!loading && !error && (
                    <>
                        <StakeholderStats/>
                        <div className="panel">
                            <div className="panel-header">
                                <label className="panel-label">Stakeholder List</label>
                            </div>
                            <div className="panel-content">
                                <StakeholderInput/>
                                <ul className="stakeholder-card-list">
                                    {stakeholders.map((stakeholder: Stakeholder) => (
                                        <StakeholderCard key={stakeholder.id} stakeholder={stakeholder}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Stakeholders;

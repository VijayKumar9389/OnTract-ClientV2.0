import './Stakeholders.scss';
import {getStakeholdersByProjectId} from "../../services/stakeholder.services.ts";
import {useEffect, useState} from "react";
import {Stakeholder} from "../../models/stakeholder.models.ts";
import StakeholderCard from "./components/StakeholderCard/StakeholderCard.tsx";
import StakeholderInput from "./components/StakeholderInput/StakeholderInput.tsx";
import StakeholderStats from "./components/StakeholderStats/StakeholderStats.tsx";
import Heading from "../../components/Heading/Heading.tsx";
import {getProjectFromCookie} from "../../utils/cookieHelper.ts";

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
        fetchStakeholders()
            .then( () => console.log('Stakeholders fetched'));
    }, []);

    return (
        <div className="section">
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
                        <StakeholderInput/>
                        <ul className="stakeholder-card-list">
                            {stakeholders.map((stakeholder: Stakeholder) => (
                                <StakeholderCard key={stakeholder.id} stakeholder={stakeholder}/>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default Stakeholders;

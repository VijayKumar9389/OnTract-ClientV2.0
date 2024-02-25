import './Stakeholders.scss';
import {getStakeholdersByProjectId} from "../../services/stakeholder.services.ts";
import {useEffect, useState} from "react";
import {Stakeholder} from "../../models/stakeholder.models.ts";
import StakeholderCard from "./components/StakeholderCard/StakeholderCard.tsx";
import StakeholderInput from "./components/StakeholderInput/StakeholderInput.tsx";
import StakeholderStats from "./components/StakeholderStats/StakeholderStats.tsx";
import Heading from "../../components/Heading/Heading.tsx";

const Stakeholders = () => {
    const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStakeholders = async (): Promise<void> => {
        try {
            setLoading(true);
            const projectId: number = 1;
            const fetchedStakeholders: Stakeholder[] = await getStakeholdersByProjectId(projectId);
            setStakeholders(fetchedStakeholders);
        } catch (error) {
            setError('Failed to fetch stakeholders');
        } finally {
            setLoading(false);
        }
    }

    useEffect((): void => {
        fetchStakeholders();
    }, []);

    // Different returns based on different conditions or states
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (stakeholders.length === 0) {
        return <p>No stakeholders found.</p>;
    }

    return (
        <div className="stakeholders-container">
            <Heading heading="Stakeholders"/>
            <div className="page-content">
                <StakeholderStats/>
                <StakeholderInput/>
                <ul className="stakeholder-card-list">
                    {stakeholders.map((stakeholder: Stakeholder) => (
                        <StakeholderCard key={stakeholder.id} stakeholder={stakeholder}/>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Stakeholders;

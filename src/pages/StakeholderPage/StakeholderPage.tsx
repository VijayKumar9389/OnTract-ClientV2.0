import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStakeholderById } from "../../services/stakeholder.services";
import "./StakeholderPage.scss";
import { Stakeholder } from "../../models/stakeholder.models.ts";
import StakeholderForm from "./components/StakeholderForm/StakeholderForm.tsx";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import TractList from "./components/TractForm/TractList.tsx";
import StakeholderDelivery from "./components/StakeholderDelivery/StakeholderDelivery.tsx";
import RelatedStakeholders from "./components/RelatedStakeholders/RelatedStakeholders.tsx";

const StakeholderPage = () => {
    const { id } = useParams<{ id: string }>();
    const [stakeholder, setStakeholder] = useState<Stakeholder | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void => {
        if (!id) return;
        setLoading(true);
        getStakeholderById(parseInt(id))
            .then((response: Stakeholder) => {
                setStakeholder(response);
            })
            .catch((): void => {
                setError("Failed to fetch stakeholder");
            })
            .finally((): void => {
                setLoading(false);
            });
    }, [id]);

    // Different returns based on different conditions or states
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!stakeholder) {
        return <p>No stakeholder found</p>;
    }

    if (stakeholder) return (
        <div className="stakeholder-page">
            <PageHeading heading={stakeholder.name} />
                <div className="page-content">
                    <StakeholderForm stakeholder={stakeholder}/>
                    <StakeholderDelivery packageId={stakeholder.packageId} stakeholder={stakeholder}/>
                    <RelatedStakeholders stakeholderId={stakeholder.id}/>
                    <TractList tracts={stakeholder.tractRecords}/>
                </div>
        </div>
    );
};

export default StakeholderPage;

import { useParams } from "react-router-dom";
import StakeholderForm from "./components/StakeholderForm/StakeholderForm.tsx";
import SubPageHeading from "../../components/SubPageHeading/SubPageHeading.tsx";
import StakeholderDelivery from "./components/StakeholderDelivery/StakeholderDelivery.tsx";
import RelatedStakeholdersTable from "./components/RelatedStakeholdersTable/RelatedStakeholdersTable.tsx";
import TractItem from "./components/TractItem/TractItem.tsx";
import {useGetStakeholder} from "../../hooks/stakeholders.hooks.ts";
import {TractRecord} from "../../models/stakeholder.models.ts";

const StakeholderPage = () => {
    const { id } = useParams<{ id: string }>();
    const { stakeholder, loading, error } = useGetStakeholder(id);

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

    return (
        <div className="section">
            <SubPageHeading heading={stakeholder.name} />
            <div className="page-content">
                <StakeholderForm stakeholder={stakeholder} />
                <StakeholderDelivery packageId={stakeholder.packageId} stakeholder={stakeholder} />
                <RelatedStakeholdersTable stakeholderId={stakeholder.id} />
                <ul className="tract-list">
                    {stakeholder.tractRecords.map((tract: TractRecord, index: number) => (
                        <TractItem key={index} tract={tract} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StakeholderPage;
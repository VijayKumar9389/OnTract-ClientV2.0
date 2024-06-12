import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useGetStakeholderByProjectID} from "../../hooks/stakeholders.hooks.ts";
import {filterStakeholders} from "../../utils/filter.utils.ts";
import StakeholderStats from "./components/StakeholderStats/StakeholderStats.tsx";
import StakeholderInput from "./components/StakeholderInput/StakeholderInput.tsx";
import StakeholderCard from "./components/StakeholderCard/StakeholderCard.tsx";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import {Stakeholder} from "../../models/stakeholder.models.ts";

const Stakeholders: React.FC = () => {
    const {stakeholders, loading, error} = useGetStakeholderByProjectID();

    const searchText: string = useSelector((state: RootState) => state.stakeholder.searchText);
    const searchType: number = useSelector((state: RootState) => state.stakeholder.searchType);
    const contactFilter: number = useSelector((state: RootState) => state.stakeholder.contacted);
    const consultedFilter: number = useSelector((state: RootState) => state.stakeholder.consulted);
    const attemptedFilter: number = useSelector((state: RootState) => state.stakeholder.attempted);
    const deliveryFilter: number = useSelector((state: RootState) => state.stakeholder.delivery);

    const filteredStakeholders: Stakeholder[] = filterStakeholders(
        stakeholders,
        searchText,
        searchType,
        contactFilter,
        consultedFilter,
        attemptedFilter,
        deliveryFilter
    );

    return (
        <div className="section">
            <PageHeading heading="Stakeholders"/>
            <div className="page-content">
                {loading && <p>Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && (
                    <>
                        <StakeholderStats/>
                        <StakeholderInput/>
                        <p className="list-stat">Results: <strong>{filteredStakeholders.length}</strong></p>
                        <ul className="card-list">
                            {filteredStakeholders.map(stakeholder => (
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

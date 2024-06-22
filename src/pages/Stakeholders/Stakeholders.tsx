import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useGetStakeholderByProjectID} from "../../hooks/stakeholders.hooks.ts";
import {filterStakeholders} from "../../utils/stakeholder.filter.utils.ts";
import StakeholderStats from "./components/StakeholderStats/StakeholderStats.tsx";
import StakeholderInput from "./components/StakeholderInput/StakeholderInput.tsx";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import {Stakeholder} from "../../models/stakeholder.models.ts";
import StakeholderList from "./components/StakeholderList/StakeholderList.tsx";
import LastViewedStakeholder from "./components/LastViewedStakeholder/LastViewedStakeholder.tsx";
import ActiveStakeholderFilters from "./components/ActiveStakeholderFilters/ActiveStakeholderFilters.tsx";

const Stakeholders: React.FC = () => {
    const {stakeholders, loading, error} = useGetStakeholderByProjectID();

    const searchText: string = useSelector((state: RootState) => state.stakeholder.searchText);
    const searchType: number = useSelector((state: RootState) => state.stakeholder.searchType);
    const contactFilter: number = useSelector((state: RootState) => state.stakeholder.contacted);
    const consultedFilter: number = useSelector((state: RootState) => state.stakeholder.consulted);
    const attemptedFilter: number = useSelector((state: RootState) => state.stakeholder.attempted);
    const deliveryFilter: number = useSelector((state: RootState) => state.stakeholder.delivery);
    const missingFilter: number = useSelector((state: RootState) => state.stakeholder.missing);

    const filteredStakeholders: Stakeholder[] = filterStakeholders(
        stakeholders,
        searchText,
        searchType,
        contactFilter,
        consultedFilter,
        attemptedFilter,
        deliveryFilter,
        missingFilter
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
                        <LastViewedStakeholder />
                        <StakeholderInput/>
                        <ActiveStakeholderFilters count={filteredStakeholders.length} />
                        <StakeholderList stakeholders={filteredStakeholders} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Stakeholders;

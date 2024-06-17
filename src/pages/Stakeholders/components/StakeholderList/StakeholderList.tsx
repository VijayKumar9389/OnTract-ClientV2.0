import React from "react";
import {Stakeholder} from "../../../../models/stakeholder.models";
import NoDataMessage from "../../../../components/NoDataMessage/NoDataMessage";
import StakeholderCard from "./StakeholderCard";

const StakeholderList: React.FC<{ stakeholders: Stakeholder[] }> = ({stakeholders}) => {
    if (stakeholders.length === 0) return <NoDataMessage message="No stakeholders found."/>;

    return (
            <ul className="card-list">
                {stakeholders.map(stakeholder => (
                    <StakeholderCard key={stakeholder.id} stakeholder={stakeholder}/>
                ))}
            </ul>
    );
}

export default StakeholderList;

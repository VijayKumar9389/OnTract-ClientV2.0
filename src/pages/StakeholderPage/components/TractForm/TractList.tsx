import {TractRecord} from "../../../../models/stakeholder.models.ts";
import React from "react";
import TractItem from "./TractItem.tsx";
import './TractForm.scss';

interface TractListProps {
    tracts: TractRecord[];
}

const TractList: React.FC<TractListProps> = ({tracts}) => {
    return (
        <ul className="tract-list">
            {tracts.map((tract, index) => {
                return <TractItem key={index} tract={tract} />
            })}
        </ul>
    );
}

export default TractList;
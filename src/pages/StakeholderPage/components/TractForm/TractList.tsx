import {TractRecord} from "../../../../models/stakeholder.models.ts";
import React from "react";
import TractItem from "./TractItem.tsx";
import './TractForm.scss';

const TractList: React.FC<{tracts: TractRecord[]}> = ({tracts}) => {
    return (
        <ul className="tract-list">
            {tracts.map((tract, index) => {
                return <TractItem key={index} tract={tract} />
            })}
        </ul>
    );
}

export default TractList;
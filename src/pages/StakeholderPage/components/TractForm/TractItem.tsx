import React, {useEffect, useState} from "react";
import {Stakeholder, TractRecord} from "../../../../models/stakeholder.models.ts";
import {getStakeholdersByTractNo} from "../../../../services/stakeholder.services.ts";
import TractForm from "./TractForm.tsx";

interface TractItemProps {
    tract: TractRecord;
}

const TractItem: React.FC<TractItemProps> = ({tract}) => {

    const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
    const project = 1;

    useEffect((): void => {
        if (!project) return;
        getStakeholdersByTractNo(project, tract.tract).then((response: Stakeholder[]): void => {
            setStakeholders(response);
        });
    }, [tract.tract, project]);

    return (
        <li>
            <div className="header">
                <label className="panel-label">TRACT <strong>{tract.tract}</strong></label>
            </div>
            <div style={{padding: "1rem"}}>
                <p className="tract-details">
                    Carrying: <span className="list-item">{tract.commodity}</span>
                    <span className="separator">|</span>
                    Currently: <span className="list-item">{tract.pipelineStatus}</span>
                    <span className="separator">|</span>
                    Pin: <span className="list-item">{tract.pin}</span>
                </p>
                <ul className="tract-form-list">
                    {stakeholders.map((stakeholder, index) => {
                        const tractRecord: TractRecord = stakeholder.tractRecords[0];
                        return <TractForm key={index} stakeholder={stakeholder} tractRecord={tractRecord}/>
                    })}
                </ul>
            </div>
        </li>
    )

}

export default TractItem;
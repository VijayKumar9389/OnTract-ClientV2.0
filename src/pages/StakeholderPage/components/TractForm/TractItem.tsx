import React, {useEffect, useState} from "react";
import {Stakeholder, TractRecord} from "../../../../models/stakeholder.models.ts";
import {getStakeholdersByTractNo} from "../../../../services/stakeholder.services.ts";
import TractForm from "./TractForm.tsx";
import {getProjectFromCookie} from "../../../../utils/cookieHelper.ts";

interface TractItemProps {
    tract: TractRecord;
}

const TractItem: React.FC<TractItemProps> = ({tract}) => {

    const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
    const project = getProjectFromCookie()

    useEffect((): void => {
        if (!project) return;
        getStakeholdersByTractNo(project.id, tract.tract).then((response: Stakeholder[]): void => {
            setStakeholders(response);
        });
    }, [tract.tract]);

    return (
        <li className="panel">
            <div className="panel-header">
                <label className="panel-label">TRACT <strong>{tract.tract}</strong></label>
            </div>
            <div className="page-content
            ">
                <p className="info-list">
                    Carrying: <span className="info-item">{tract.commodity}</span>
                    <span className="separator">|</span>
                    Currently: <span className="info-item">{tract.pipelineStatus}</span>
                    <span className="separator">|</span>
                    Pin: <span className="info-item">{tract.pin}</span>
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
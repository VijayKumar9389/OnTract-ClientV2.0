import React, {useEffect, useState} from "react";
import {Project, Stakeholder, TractRecord} from "../../../../models/stakeholder.models.ts";
import {getStakeholdersByTractNo} from "../../../../services/stakeholder.services.ts";
import TractForm from "./TractForm.tsx";
import {getProjectFromCookie} from "../../../../utils/cookieHelper.ts";
import './TractItem.scss';

const TractItem: React.FC<{tract: TractRecord}> = ({tract}) => {

    const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
    const project: Project | null = getProjectFromCookie()

    useEffect((): void => {
        if (!project) return;
        getStakeholdersByTractNo(project.id, tract.tract).then((response: Stakeholder[]): void => {
            console.log(response)
            setStakeholders(response);
        });
    }, [tract.tract]);

    return (
        <li className="panel">
            <div className="panel-header">
                <h3 className="panel-heading">TRACT <strong>{tract.tract}</strong></h3>
            </div>
            <div className="page-content">
                <p className="info-list">
                    Carrying: <span className="info-item">{tract.commodity}</span>
                    <span className="separator">|</span>
                    Currently: <span className="info-item">{tract.pipelineStatus}</span>
                    <span className="separator">|</span>
                    Pin: <span className="info-item">{tract.pin}</span>
                </p>
                <ul className="tract-form-list">
                    {stakeholders.map((stakeholder: Stakeholder, index: number) => {
                        const tractRecord: TractRecord = stakeholder.tractRecords[0];
                        return <TractForm key={index} stakeholder={stakeholder} tractRecord={tractRecord}/>
                    })}
                </ul>
            </div>
        </li>
    )

}

export default TractItem;
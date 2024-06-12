// components/TractItem.tsx
import React from 'react';
import { TractRecord } from '../../../../models/stakeholder.models.ts';
import {useStakeholdersByTractNo} from "../../../../hooks/stakeholders.hooks.ts";
import TractForm from './TractForm.tsx';
import './TractItem.scss';

interface TractItemProps {
    tract: TractRecord;
}

const TractItem: React.FC<TractItemProps> = ({ tract }) => {
    const { stakeholders, loading, error } = useStakeholdersByTractNo(tract.tract);

    return (
        <li className="panel">
            <div className="panel-header">
                <h3>Tract <strong>{tract.tract}</strong></h3>
            </div>
            <div className="page-content">
                <p className="info-list">
                    Carrying: <span className="info-item">{tract.commodity}</span>
                    <span className="separator">|</span>
                    Currently: <span className="info-item">{tract.pipelineStatus}</span>
                    <span className="separator">|</span>
                    Pin: <span className="info-item">{tract.pin}</span>
                </p>
                {loading && <div>Loading...</div>}
                {error && <div className="error-message">{error}</div>}
                {!loading && !error && (
                    <ul className="tract-form-list">
                        {stakeholders.map((stakeholder, index) => (
                            <TractForm key={index} stakeholder={stakeholder} tractRecord={stakeholder.tractRecords[0]} />
                        ))}
                    </ul>
                )}
            </div>
        </li>
    );
};

export default TractItem;

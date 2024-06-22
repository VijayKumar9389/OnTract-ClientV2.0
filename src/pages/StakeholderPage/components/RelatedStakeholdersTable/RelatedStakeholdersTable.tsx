import {useRelatedStakeholders} from "../../../../hooks/stakeholders.hooks.ts";
import RelatedStakeholderRow from "./RelatedStakeholderRow.tsx";
import {RelatedStakeholder} from "../../../../models/stakeholder.models.ts";
import NoDataMessage from "../../../../components/NoDataMessage/NoDataMessage.tsx";
import React from "react";

const RelatedStakeholdersTable: React.FC<{ stakeholderId: number }> = ({ stakeholderId }) => {
    const { relatedStakeholders, loading, error } = useRelatedStakeholders(stakeholderId);

    return (
        <div className="panel">
            <div className="panel-header">
                <h3>Related Stakeholders</h3>
            </div>
            <div className="panel-content">
                {loading ? (
                    <div className="loading-message">Loading...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : relatedStakeholders.length === 0 ? (
                    <NoDataMessage message="No Related Stakeholders" />
                ) : (
                    <div className="table-wrapper">
                        <table className="select-table">
                            <thead>
                            <tr>
                                <th>Stakeholder</th>
                                <th>Phone Number</th>
                                <th>Mailing Address</th>
                                <th>Street Address</th>
                            </tr>
                            </thead>
                            <tbody className="details">
                            {relatedStakeholders.map((relatedStakeholder: RelatedStakeholder, index: number) => (
                                <RelatedStakeholderRow key={index} relatedStakeholder={relatedStakeholder} />
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RelatedStakeholdersTable;


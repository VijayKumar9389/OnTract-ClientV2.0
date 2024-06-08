import {getRelatedStakeholder} from "../../../../services/stakeholder.services.ts";
import {useEffect, useState} from "react";
import {RelatedStakeholder} from "../../../../models/stakeholder.models.ts";
import {Navigation} from "../../../../utils/navigation.ts";

const RelatedStakeholders: React.FC<{ stakeholderId: number }> = ({stakeholderId}) => {

    const [relatedStakeholders, setRelatedStakeholders] = useState<RelatedStakeholder[]>([]);
    const {navigateToStakeholder} = Navigation();

    useEffect(() => {
        getRelatedStakeholder(stakeholderId)
            .then((relatedStakeholders: RelatedStakeholder[]): void => {
                console.log(relatedStakeholders);
                setRelatedStakeholders(relatedStakeholders);
            })
            .catch((error) => {
                console.error('Error getting related stakeholders:', error);
            });
    }, []);

    const isTrue = (value: boolean): boolean => {
        return value;
    };

    return (
        <div className="panel">
            <div className="panel-header">
                <h3 className="panel-heading">Related Stakeholders</h3>
            </div>
            <div className="panel-content">
                {relatedStakeholders.length > 0 ? (
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
                                <tr key={index} className="stakeholder-item"
                                    onClick={() => navigateToStakeholder(relatedStakeholder.stakeholder.id)}>
                                    <td>
                                        <span>{relatedStakeholder.stakeholder.name}</span>
                                    </td>
                                    <td>
                                    <span>{isTrue(relatedStakeholder.isPhoneSame) ?
                                        <a className="chip green">Match</a> :
                                        <a className="chip red">No Match</a>}</span>
                                    </td>
                                    <td>
                                    <span>{isTrue(relatedStakeholder.isMailingAddressSame) ?
                                        <a className="chip green">Match</a> :
                                        <a className="chip red">No Match</a>}</span>
                                    </td>
                                    <td>
                                    <span>{isTrue(relatedStakeholder.isStreetAddressSame) ?
                                        <a className="chip green">Match</a> :
                                        <a className="chip red">No Match</a>}</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="no-data-message">
                        <span>No Related Stakeholders.</span>
                    </div>
                )}

            </div>
        </div>
    );
}

export default RelatedStakeholders;
import './RelatedStakeholder.scss';
import {getRelatedStakeholder} from "../../../../services/stakeholder.services.ts";
import {useEffect, useState} from "react";
import {RelatedStakeholder, Stakeholder} from "../../../../models/stakeholder.models.ts";
import {useNavigate} from "react-router-dom";


const RelatedStakeholders: React.FC<{ stakeholderId: number }> = ({ stakeholderId }) => {

    const [relatedStakeholders, setRelatedStakeholders] = useState<RelatedStakeholder[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRelatedStakeholder(stakeholderId)
            .then((relatedStakeholders: RelatedStakeholder[]) => {
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

    const selectStakeholder = (stakeholder: Stakeholder): void => {
        navigate(`/stakeholder/${stakeholder.id}`);
    }

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Related Stakeholders</label>
            </div>
            <div className="panel-content">
                {relatedStakeholders.length > 0 ? (
                    <table className="related-stakeholder-table">
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
                            <tr key={index} className="stakeholder-item" onClick={() => selectStakeholder(relatedStakeholder.stakeholder)}>
                                <td>
                                    <span>{relatedStakeholder.stakeholder.name}</span>
                                </td>
                                <td>
                                    <span>{isTrue(relatedStakeholder.isPhoneSame) ? <a className="chip green">Match</a> : <a className="chip red">No Match</a> }</span>
                                </td>
                                <td>
                                    <span>{isTrue(relatedStakeholder.isMailingAddressSame) ? <a className="chip green">Match</a> : <a className="chip red">No Match</a>}</span>
                                </td>
                                <td>
                                    <span>{isTrue(relatedStakeholder.isStreetAddressSame) ? <a className="chip green">Match</a> : <a className="chip red">No Match</a>}</span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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
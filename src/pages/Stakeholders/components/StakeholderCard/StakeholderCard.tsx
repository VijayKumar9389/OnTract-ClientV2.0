import './StakeholderCard.scss';
import React from "react";
import {Navigation} from "../../../../utils/navigation.ts";
import {Stakeholder} from "../../../../models/stakeholder.models.ts";
import {
    FaPhone,
    FaMapMarker,
    FaEnvelope,
    FaUser,
    FaComment,
    FaTruck,
    FaVoicemail, FaHandshake
} from 'react-icons/fa';
import {FaLocationDot} from "react-icons/fa6";
import { isAvailable, getAttemptNo, isNotNull, getLocation, getStatus} from "../../../../utils/helpers.ts";


const StakeholderCard: React.FC<{ stakeholder: Stakeholder }> = ({stakeholder}) => {
    const {navigateToStakeholder} = Navigation();

    return (
        <div
            className="stakeholder-card"
            onClick={() => navigateToStakeholder(stakeholder.id)}
        >
            <div className="card-header">
                <h3>{stakeholder.name}</h3>
                <p className="desc">{getLocation(stakeholder.streetAddress)}</p>
            </div>
            <ul className="detail-list">
                <li>
                    <span><FaPhone/></span>
                    <div>
                    <p>Phone:</p>
                        {isAvailable(stakeholder.phoneNumber)
                            ? <a className="chip green">Yes</a>
                            : <a className="chip red">No</a>
                        }
                    </div>
                </li>
                <li>
                    <span><FaMapMarker/></span>
                    <div>
                        <p>Address:</p>
                        {isAvailable(stakeholder.streetAddress)
                            ? <a className="chip green">Yes</a>
                            : <a className="chip red">No</a>
                        }
                    </div>
                </li>
                <li>
                    <span><FaEnvelope/></span>
                    <div>
                        <p>Mailing:</p>
                        {isAvailable(stakeholder.mailingAddress)
                            ? <a className="chip green">Yes</a>
                            : <a className="chip red">No</a>
                        }
                    </div>
                </li>
                <li>
                    <span><FaUser/></span>
                    <div>
                        <p>Status:</p>
                        <a className={"chip " + getStatus(stakeholder.stakeholderStatus)}>{stakeholder.stakeholderStatus}</a>
                    </div>
                </li>
                <li>
                    <span><FaComment/></span>
                    <div>
                        <p>Contacted:</p>
                        {isAvailable(stakeholder.contacted)
                            ? <a className="chip green">Yes</a>
                            : <a className="chip red">No</a>
                        }
                    </div>
                </li>
                <li>
                    <span><FaHandshake/></span>
                    <div>
                        <p>Consultation:</p>
                        {isAvailable(stakeholder.consultation)
                            ? <a className="chip green">Yes</a>
                            : <a className="chip red">No</a>}
                    </div>
                </li>
                <li>
                    <span><FaTruck/></span>
                    <div>
                        <p>Delivery:</p>
                        {isNotNull(stakeholder.packageId)
                            ? <a className="chip green">Yes</a>
                            : <a className="chip red">No</a>
                        }
                    </div>
                </li>
                <li>
                    <span><FaVoicemail/></span>
                    <div>
                        <p>Attempts:</p>
                        <a className="number">{getAttemptNo(stakeholder.attempts)}</a>
                    </div>
                </li>
                <li>
                    <span><FaLocationDot/></span>
                    <div>
                        <p>Tracts:</p>
                        <a className="number">{stakeholder.tractRecords.length}</a>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default StakeholderCard;
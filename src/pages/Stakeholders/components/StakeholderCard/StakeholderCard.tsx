import './StakeholderCard.scss';
import React from "react";
import {useNavigate} from "react-router-dom";
import {Stakeholder} from "../../../../models/stakeholder.models.ts";
import {FaPhone, FaMapMarker, FaEnvelope, FaUser, FaComment, FaClock, FaTruck, FaLandmark} from 'react-icons/fa';

const StakeholderCard: React.FC<{ stakeholder: Stakeholder }> = ({stakeholder}) => {
    const navigate = useNavigate();

    const selectStakeholder = (): void => {
        navigate(`/stakeholder/${stakeholder.id}`);
    };

    const isAvailable = (value: string): boolean => (value !== "");

    const getAttemptNo = (attempts: string): number => {
        const cleanedAttempts = attempts.trim();

        if (cleanedAttempts !== "") {
            const splitAttempts = cleanedAttempts.split(",");
            return splitAttempts.length;
        } else {
            return 0;
        }
    };

    const isNotNull = (value: number | null): string => (value !== null ? "Planned" : "Not Planned");

    const getLocation = (streetAddress: string): string => {
        const location = streetAddress.split(",");

        if (location.length >= 3) {
            return `${location[location.length - 3].trim()}, ${location[location.length - 2].trim()}`;
        }

        return "MISSING LOCATION";
    };

    const getStatus = (stakeholderStatus: string): string => {
        if (stakeholderStatus === "GREEN") {
            return "green";
        } else if (stakeholderStatus === "YELLOW") {
            return "yellow";
        }
        return "red";
    };

    return (
        <div
            className="stakeholder-card"
            onClick={() => selectStakeholder()}
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
                    <span><FaComment/></span>
                    <div>
                        <p>Consultation:</p>
                        {isAvailable(stakeholder.consultation) ? <a className="chip green">Yes</a> :
                            <a className="chip red">No</a>}
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
                    <span><FaClock/></span>
                    <div>
                        <p>Attempts:</p>
                        <a className="number">{getAttemptNo(stakeholder.attempts)}</a>
                    </div>
                </li>
                <li>
                    <span><FaLandmark/></span>
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
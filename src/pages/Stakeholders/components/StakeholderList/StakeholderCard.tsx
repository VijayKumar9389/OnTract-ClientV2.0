import React from "react";
import { NavigationUtils } from "../../../../utils/navigation.utils.ts";
import { Stakeholder } from "../../../../models/stakeholder.models.ts";
import {
    FaPhone, FaMapMarker, FaEnvelope, FaUser, FaComment, FaTruck, FaVoicemail, FaHandshake
} from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { isAvailable, getAttemptNo, isNotNull, getLocation, getStatus, isContacted } from "../../../../utils/functions.utils.ts";
import {StatusItem} from "../../../../components/Stat/StatusStat.tsx";
import {NumberItem} from "../../../../components/Stat/NumberStat.tsx";
import {useDispatch} from "react-redux";

const StakeholderCard: React.FC<{ stakeholder: Stakeholder }> = ({ stakeholder }) => {
    const { navigateToStakeholder } = NavigationUtils();
    const dispatch = useDispatch();
    return (
        <div className="card" onClick={() => navigateToStakeholder(stakeholder.id, dispatch)}>
            <div className="card-header">
                <h3>{stakeholder.name}</h3>
                <p>{getLocation(stakeholder.streetAddress)}</p>
            </div>
            <ul className="detail-list">
                <StatusItem icon={<FaPhone />} label="Phone" isAvailable={isAvailable(stakeholder.phoneNumber)} />
                <StatusItem icon={<FaMapMarker />} label="Address" isAvailable={isAvailable(stakeholder.streetAddress)} />
                <StatusItem icon={<FaEnvelope />} label="Mailing" isAvailable={isAvailable(stakeholder.mailingAddress)} />
                <StatusItem icon={<FaUser />} label="Status" isAvailable={true} availableText={getStatus(stakeholder.stakeholderStatus)} unavailableText={getStatus(stakeholder.stakeholderStatus)} />
                <StatusItem icon={<FaComment />} label="Contacted" isAvailable={isContacted(stakeholder.contacted)} />
                <StatusItem icon={<FaHandshake />} label="Consultation" isAvailable={isAvailable(stakeholder.consultation)} />
                <StatusItem icon={<FaTruck />} label="Delivery" isAvailable={isNotNull(stakeholder.packageId)} />
                <NumberItem icon={<FaVoicemail />} label="Attempts" number={getAttemptNo(stakeholder.attempts)} />
                <NumberItem icon={<FaLocationDot />} label="Tracts" number={stakeholder.tractRecords.length} />
            </ul>
        </div>
    );
}

export default StakeholderCard;

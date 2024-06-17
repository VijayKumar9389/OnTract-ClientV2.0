import { useGetStakeholder} from "../../../../hooks/stakeholders.hooks.ts";// Adjust path as needed
import StakeholderCard from '../StakeholderList/StakeholderCard';
import './LastViewedStakeholder.scss';
import { useSelector } from 'react-redux';
import {RootState} from "../../../../store";

const LastViewedStakeholder = () => {
    const lastViewedStakeholderId: number = useSelector(
        (state: RootState) => state.stakeholder.lastViewedStakeholder
    );

    const { stakeholder, loading, error } = useGetStakeholder(
        lastViewedStakeholderId.toString()
    );

    if (lastViewedStakeholderId === 0) return null; // Don't render if no stakeholder is selected
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!stakeholder) return null;

    return (
        <div className="last-viewed">
            <label>Last Viewed</label>
            <div className="panel">
                <StakeholderCard stakeholder={stakeholder} />
            </div>
        </div>
    );
};

export default LastViewedStakeholder;

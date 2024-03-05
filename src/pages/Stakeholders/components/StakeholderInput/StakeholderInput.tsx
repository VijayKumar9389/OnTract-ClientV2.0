import './StakeholderInput.scss';
import { MdFilterAlt, MdFilterAltOff } from 'react-icons/md';

const StakeholderInput = () => {

    return (
        <div className="stakeholder-input">
            <input type="text" placeholder="Search for a stakeholder" className="input-field"/>
            <button className="filter-button"><MdFilterAlt/>Filter</button>
            <button className="clear-filter-button"><MdFilterAltOff/>Clear Filter</button>
        </div>
    );
}

export default StakeholderInput;
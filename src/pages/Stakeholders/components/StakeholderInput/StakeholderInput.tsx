import './StakeholderInput.scss';
import { MdFilterAlt, MdFilterAltOff } from 'react-icons/md';

const StakeholderInput = () => {

    return (
        <div className="stakeholder-input">
            <input type="text" placeholder="Search for a stakeholder"/>
            <button><MdFilterAlt />Filter</button>
            <button><MdFilterAltOff/>Clear Filter</button>
        </div>
    );
}

export default StakeholderInput;
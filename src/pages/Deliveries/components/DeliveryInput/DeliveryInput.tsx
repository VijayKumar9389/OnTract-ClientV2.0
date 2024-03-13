import './DeliveryInput.scss';
import {MdFilterAlt, MdFilterAltOff} from "react-icons/md";

const DeliveryInput = () => {
    return (
        <div className="page-input">
            <input type="text" placeholder="Search for a Route" className="input-field"/>
            <button className="filter-button"><MdFilterAlt/>Filter</button>
            <button className="clear-filter-button"><MdFilterAltOff/>Clear Filter</button>
        </div>
    );
}

export default DeliveryInput;
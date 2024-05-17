import React, {ChangeEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setAttempted,
    setDelivery,
    setContacted,
    setConsulted,
    setSearchType
} from "../../../../store/reducers/stakeholder.reducer";
import {RootState} from "../../../../store";
import './StakeholderFilter.scss';
import RadioButton from "../../../../components/RadioButton/RadioButton.tsx";

const StakeholderFilter: React.FC = () => {
    const dispatch = useDispatch();
    const contacted: number = useSelector((state: RootState) => state.stakeholder.contacted);
    const attempted: number = useSelector((state: RootState) => state.stakeholder.attempted);
    const consulted: number = useSelector((state: RootState) => state.stakeholder.consulted);
    const delivery: number = useSelector((state: RootState) => state.stakeholder.delivery);
    const searchType: number = useSelector((state: RootState) => state.stakeholder.searchType);

    const handleSetContacted = (value: number): void => {
        dispatch(setContacted(value));
    };

    const handleSetAttempted = (value: number): void => {
        dispatch(setAttempted(value));
    };

    const handleSetConsulted = (value: number): void => {
        dispatch(setConsulted(value));
    }

    const handleSetDelivery = (value: number): void => {
        dispatch(setDelivery(value));
    }

    const handleSetSearchType = (event: ChangeEvent<HTMLSelectElement>): void => {
        const value: number = parseInt(event.target.value, 10);
        dispatch(setSearchType(value));
    }

    return (
        <div className="stakeholder-filter">
            <div className="input-wrapper">
                <label htmlFor="search">Search By:</label>
                <select id="search" className="select-dropdown" onChange={handleSetSearchType} value={searchType}>
                    <option value={0}>Stakeholder</option>
                    <option value={1}>Phone No.</option>
                    <option value={2}>Tract No.</option>
                    <option value={3}>Location</option>
                </select>
            </div>
            <div className="filter-options">
                <div className="filter-wrapper">
                    <h3>Contacted</h3>
                    <div className="radio-group">
                        <RadioButton
                            id="contacted-all"
                            name="contacted"
                            value={0}
                            checked={contacted === 0}
                            onChange={handleSetContacted}
                            labelText="All"
                        />
                        <RadioButton
                            id="contacted-yes"
                            name="contacted"
                            value={1}
                            checked={contacted === 1}
                            onChange={handleSetContacted}
                            labelText="Yes"
                        />
                        <RadioButton
                            id="contacted-no"
                            name="contacted"
                            value={2}
                            checked={contacted === 2}
                            onChange={handleSetContacted}
                            labelText="No"
                        />
                    </div>
                </div>
                <div className="filter-wrapper">
                    <h3>Attempted</h3>
                    <div className="radio-group">
                        <RadioButton
                            id="attempted-all"
                            name="attempted"
                            value={0}
                            checked={attempted === 0}
                            onChange={handleSetAttempted}
                            labelText="All"
                        />
                        <RadioButton
                            id="attempted-yes"
                            name="attempted"
                            value={1}
                            checked={attempted === 1}
                            onChange={handleSetAttempted}
                            labelText="Yes"
                        />
                        <RadioButton
                            id="attempted-no"
                            name="attempted"
                            value={2}
                            checked={attempted === 2}
                            onChange={handleSetAttempted}
                            labelText="No"
                        />
                    </div>
                </div>
                <div className="filter-wrapper">
                    <h3>Consulted</h3>
                    <div className="radio-group">
                        <RadioButton
                            id="consulted-all"
                            name="consulted"
                            value={0}
                            checked={consulted === 0}
                            onChange={handleSetConsulted}
                            labelText="All"
                        />
                        <RadioButton
                            id="consulted-yes"
                            name="consulted"
                            value={1}
                            checked={consulted === 1}
                            onChange={handleSetConsulted}
                            labelText="Yes"
                        />
                        <RadioButton
                            id="consulted-no"
                            name="consulted"
                            value={2}
                            checked={consulted === 2}
                            onChange={handleSetConsulted}
                            labelText="No"
                        />
                    </div>
                </div>
                <div className="filter-wrapper">
                    <h3>Delivery</h3>
                    <div className="radio-group">
                        <RadioButton
                            id="delivery-all"
                            name="delivery"
                            value={0}
                            checked={delivery === 0}
                            onChange={handleSetDelivery}
                            labelText="All"
                        />
                        <RadioButton
                            id="delivery-yes"
                            name="delivery"
                            value={1}
                            checked={delivery === 1}
                            onChange={handleSetDelivery}
                            labelText="Yes"
                        />
                        <RadioButton
                            id="delivery-no"
                            name="delivery"
                            value={2}
                            checked={delivery === 2}
                            onChange={handleSetDelivery}
                            labelText="No"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StakeholderFilter;

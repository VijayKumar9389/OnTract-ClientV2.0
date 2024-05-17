import './DeliveryFilter.scss';
import {setCompleted, setType} from "../../../../store/reducers/delivery.reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import RadioButton from "../../../../components/RadioButton/RadioButton.tsx";

const DeliveryFilter = () => {
    const dispatch = useDispatch();
    const completed: number = useSelector((state: RootState) => state.delivery.completed);
    const type: number = useSelector((state: RootState) => state.delivery.type);

    const handleSetCompleted = (value: number): void => {
        dispatch(setCompleted(value));
    }

    const handleSetType = (value: number): void => {
        dispatch(setType(value));
    }

    return (
        <div className="delivery-filter">
            <div className="input-wrapper">
                <label htmlFor="search">Search By:</label>
                <select id="delivery-status" name="delivery-status">
                    <option value="0">Destination</option>
                    <option value="1">Stakeholder</option>
                    </select>
            </div>
            <div className="filter-options">
                <div className="filter-wrapper">
                    <h3>Status</h3>
                    <div className="radio-group">
                        <RadioButton
                            id="completed-all"
                            name="completed"
                            value={0}
                            checked={completed === 0}
                            onChange={handleSetCompleted}
                            labelText="All"
                        />
                        <RadioButton
                            id="completed-yes"
                            name="completed"
                            value={1}
                            checked={completed === 1}
                            onChange={handleSetCompleted}
                            labelText="Completed"
                        />
                        <RadioButton
                            id="completed-no"
                            name="completed"
                            value={2}
                            checked={completed === 2}
                            onChange={handleSetCompleted}
                            labelText="Pending"
                        />
                    </div>
                </div>

                <div className="filter-wrapper">
                    <h3>Type</h3>
                    <div className="radio-group">
                        <RadioButton
                            id="type-all"
                            name="type"
                            value={0}
                            checked={type === 0}
                            onChange={handleSetType}
                            labelText="All"
                        />
                        <RadioButton
                            id="type-1"
                            name="type"
                            value={1}
                            checked={type === 1}
                            onChange={handleSetType}
                            labelText="In-Person"
                        />
                        <RadioButton
                            id="type-2"
                            name="type"
                            value={2}
                            checked={type === 2}
                            onChange={handleSetType}
                            labelText="Mail-Out"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DeliveryFilter;
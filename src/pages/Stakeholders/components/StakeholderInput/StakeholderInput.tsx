import React, { useState } from "react";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import Dialog from "../../../../components/Dialog/Dialog";
import StakeholderFilter from "../StakeholderFilter/StakeholderFilter";
import { RootState } from "../../../../store";
import { useSelector, useDispatch } from "react-redux";
import { setStakeholderSearch, clearStakeholderState } from "../../../../store/reducers/stakeholder.reducer";

const StakeholderInput: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const searchText: string = useSelector((state: RootState) => state.stakeholder.searchText);

    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setStakeholderSearch(event.target.value));
    };

    const clearFilter = (): void => {
        dispatch(clearStakeholderState());
    };

    return (
        <div className="page-input">
            <Dialog
                heading="Filter Stakeholders"
                isOpen={isModalOpen}
                toggle={toggleModal}
                element={<StakeholderFilter />}
            />
            <input
                type="text"
                placeholder="Search for a stakeholder"
                className="input-field"
                value={searchText}
                onChange={handleSearchChange}
            />
            <button onClick={toggleModal} className="filter-button">
                <MdFilterAlt />
                Filter
            </button>
            <button onClick={clearFilter} className="clear-filter-button">
                <MdFilterAltOff />
                Clear Filter
            </button>
        </div>
    );
};

export default StakeholderInput;

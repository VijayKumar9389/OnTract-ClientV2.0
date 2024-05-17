import React, { useState } from "react";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import Dialog from "../../../../components/Dialog/Dialog.tsx";
import StakeholderFilter from "../StakeholderFilter/StakeholderFilter.tsx";
import { RootState } from "../../../../store";
import { useSelector, useDispatch } from "react-redux";
import { setStakeholderSearch, clearStakeholderState } from "../../../../store/reducers/stakeholder.reducer.ts";

const StakeholderInput = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useDispatch();

    const searchText: string = useSelector(
        (state: RootState) => state.stakeholder.searchText
    );

    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        dispatch(setStakeholderSearch(event.target.value));
    };

    return (
        <div className="page-input">
            <Dialog
                heading={"Filter Stakeholders"}
                isOpen={isModalOpen}
                toggle={() => toggleModal()}
                element={<StakeholderFilter />}
            />
            <input
                type="text"
                placeholder="Search for a stakeholder"
                className="input-field"
                value={searchText}
                onChange={handleSearchChange}
            />
            <button onClick={() => toggleModal()} className="filter-button">
                <MdFilterAlt />
                Filter
            </button>
            <button className="clear-filter-button" onClick={() => dispatch(clearStakeholderState())}>
                <MdFilterAltOff />
                Clear Filter
            </button>
        </div>
    );
};

export default StakeholderInput;

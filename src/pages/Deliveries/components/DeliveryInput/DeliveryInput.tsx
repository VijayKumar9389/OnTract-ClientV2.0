import {MdFilterAlt, MdFilterAltOff} from "react-icons/md";
import React, {useState} from 'react';
import Dialog from "../../../../components/Dialog/Dialog.tsx";
import DeliveryFilter from "../DeliveryFilter/DeliveryFilter.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {clearDeliveryState, setDeliverySearch} from "../../../../store/reducers/delivery.reducer.ts";

const DeliveryInput = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const searchText: string = useSelector((state: RootState) => state.delivery.searchText);
    const dispatch = useDispatch();

    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setDeliverySearch(event.target.value));
    }

    const clearFilter = (): void => {
        dispatch(clearDeliveryState());
    }

    return (
        <div className="page-input">
            <Dialog
                heading={"Filter Deliveries"}
                isOpen={isModalOpen}
                toggle={toggleModal}
                element={<DeliveryFilter/>}
            />
            <input
                type="text"
                placeholder="Search for a Route"
                className="input-field"
                value={searchText}
                onChange={handleSearchChange}
            />
            <button
                className="filter-button" onClick={() => toggleModal()}>
                <MdFilterAlt/>
                Filter
            </button>
            <button className="clear-filter-button" onClick={clearFilter}>
                <MdFilterAltOff/>
                Clear Filter
            </button>
        </div>
    );
}

export default DeliveryInput;
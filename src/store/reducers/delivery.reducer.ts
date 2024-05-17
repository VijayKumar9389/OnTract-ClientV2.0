import {createSlice} from "@reduxjs/toolkit";

interface DeliveryState {
    searchType: number;
    searchText: string;
    completed: number;
    type: number;
}

const initialState: DeliveryState = {
    searchType: 0,
    searchText: "",
    completed: 0,
    type: 0,
};


const deliverySlice = createSlice({
    name: "delivery",
    initialState,
    reducers: {
        setDeliverySearch(state, action): void {
            state.searchText = action.payload;
        },
        setCompleted(state, action): void {
            state.completed = action.payload;
        },
        setType(state, action): void {
            state.type = action.payload;
        },
        clearDeliveryState(state): void {
            Object.assign(state, initialState); // Directly assign initialState to state
        },
    },
});

export const {setDeliverySearch, clearDeliveryState, setCompleted, setType} = deliverySlice.actions;

export default deliverySlice.reducer;

import {createSlice} from "@reduxjs/toolkit";

interface DeliveryState {
    searchType: number;
    searchText: string;
    completed: number;
    deliveryMethod: number;
    route: string;
    lastViewedDelivery: number;
}

const initialState: DeliveryState = {
    searchType: 0,
    searchText: "",
    completed: 0,
    deliveryMethod: 0,
    route: "",
    lastViewedDelivery: 0
};

const deliverySlice = createSlice({
    name: "delivery",
    initialState,
    reducers: {
        setDeliverySearch(state, action): void {
            state.searchText = action.payload;
        },
        setDeliverySearchType(state, action): void {
            state.searchType = action.payload;
        },
        setCompleted(state, action): void {
            state.completed = action.payload;
        },
        setDeliveryMethod(state, action): void {
            state.deliveryMethod = action.payload;
        },
        setRoute(state, action): void {
            state.route = action.payload;
        },
        setLastViewedDelivery(state, action): void {
            state.lastViewedDelivery = action.payload;
        },
        clearDeliveryState(state): void {
            Object.assign(state, initialState);
        },
    },
});

export const {
    setDeliverySearch,
    setDeliverySearchType,
    setRoute,
    clearDeliveryState,
    setLastViewedDelivery,
    setCompleted,
    setDeliveryMethod
} = deliverySlice.actions;

export default deliverySlice.reducer;

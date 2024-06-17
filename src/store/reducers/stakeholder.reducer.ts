import {createSlice} from "@reduxjs/toolkit";

interface StakeholderState {
    searchType: number;
    searchText: string;
    contacted: number;
    consulted: number;
    attempted: number;
    delivery: number;
    missing: number;
    status: string;
    lastViewedStakeholder: number;
}

const initialState: StakeholderState = {
    searchType: 0,
    searchText: "",
    contacted: 0,
    consulted: 0,
    attempted: 0,
    delivery: 0,
    missing: 0,
    status: "",
    lastViewedStakeholder: 0
};

const stakeholderSlice = createSlice({
    name: "stakeholder",
    initialState,
    reducers: {
        setStakeholderSearch(state, action): void {
            state.searchText = action.payload;
        },
        setSearchType(state, action): void {
            state.searchType = action.payload;
        },
        setStakeholderStatus(state, action): void {
            state.status = action.payload;
        },
        setContacted(state, action): void {
            state.contacted = action.payload;
        },
        setConsulted(state, action): void {
            state.consulted = action.payload;
        },
        setAttempted(state, action): void {
            state.attempted = action.payload;
        },
        setDelivery(state, action): void {
            state.delivery = action.payload
        },
        setMissing(state, action): void {
            state.missing = action.payload
        },
        setLastViewedStakeholder(state, action): void {
            state.lastViewedStakeholder = action.payload;
        },
        clearStakeholderState(state): void {
            Object.assign(state, initialState); // Directly assign initialState to state
        },
    },
});

export const {
    setStakeholderSearch,
    clearStakeholderState,
    setSearchType,
    setStakeholderStatus,
    setMissing,
    setAttempted,
    setDelivery,
    setLastViewedStakeholder,
    setContacted,
    setConsulted
} = stakeholderSlice.actions;

export default stakeholderSlice.reducer;



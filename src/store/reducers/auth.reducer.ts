import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenResponse, AuthState } from "../../models/auth.models.ts";

const initialState: AuthState = {
    loggedIn: false,
    username: "",
    isAdmin: false, // Add isAdmin field to store admin status
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<TokenResponse>): void => {
            state.loggedIn = action.payload.auth;
            state.username = action.payload.user;
        },
        setLogout: (state): void => {
            state.loggedIn = false;
            state.username = "";
            state.isAdmin = false; // Reset isAdmin status on logout
        },
        refreshLogin: (state, action: PayloadAction<{ auth: boolean}>): void => {
            state.loggedIn = action.payload.auth;
        },
        checkAuthStatus: (state): void => {
            const accessToken: string | null = localStorage.getItem("accessToken");
            state.loggedIn = !!accessToken;
        },
        setAdminStatus: (state, action: PayloadAction<boolean>): void => {
            state.isAdmin = action.payload;
        },
    },
});

export const { setLogin, setLogout, refreshLogin, checkAuthStatus, setAdminStatus } = authSlice.actions;

export default authSlice.reducer;

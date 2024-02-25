import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenResponse, AuthState} from "../../models/auth.models.ts";

const initialState: AuthState = {
    loggedIn: false,
    username: "",
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
        },
        refreshLogin: (state, action: PayloadAction<{ auth: boolean}>): void => {
            state.loggedIn = action.payload.auth;
        },
        checkAuthStatus: (state): void => {
            const accessToken = localStorage.getItem("accessToken");
            state.loggedIn = !!accessToken;
        },
    },
});

export const { setLogin, setLogout, refreshLogin, checkAuthStatus } = authSlice.actions;

export default authSlice.reducer;

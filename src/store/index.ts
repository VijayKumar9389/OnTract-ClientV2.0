import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer.ts";
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage
import authReducer from "./reducers/auth.reducer.ts";
import deliveryReducer from "./reducers/delivery.reducer.ts";
import stakeholderReducer from "./reducers/stakeholder.reducer.ts";

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    stakeholder: stakeholderReducer,
    delivery: deliveryReducer,
});

// Configure state persistence
const persistConfig = {
    key: 'root',
    storage,
    serializableCheck: false, // Turn off serializable check
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
    reducer: persistedReducer,
    devTools: true, // Enable Redux DevTools
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

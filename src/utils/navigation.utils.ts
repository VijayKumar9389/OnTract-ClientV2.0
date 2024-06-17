// navigationUtils.ts
import { useNavigate } from "react-router-dom";
import {Dispatch} from "redux";
import {setLastViewedStakeholder} from "../store/reducers/stakeholder.reducer.ts";
import {setLastViewedDelivery} from "../store/reducers/delivery.reducer.ts";

export const NavigationUtils = () => {
    const navigate = useNavigate();

    const navigateToStakeholder = (stakeholderId: number, dispatch: Dispatch): void => {
        navigate(`/stakeholders/${stakeholderId}`);
        dispatch(setLastViewedStakeholder(stakeholderId));
    };

    const navigateToInventoryItem = (itemId: number): void => {
        navigate(`/inventory/${itemId}`);
    };

    const navigateToPackage = (id: number): void => {
        navigate(`/packages/${id}`);
    };

    const navigateToDelivery = (id: number, dispatch: Dispatch): void => {
        navigate(`/deliveries/${id}`);
        dispatch(setLastViewedDelivery(id));
    }

    return {
        navigateToStakeholder,
        navigateToInventoryItem,
        navigateToPackage,
        navigateToDelivery
    };
};

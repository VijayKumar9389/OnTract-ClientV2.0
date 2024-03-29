// navigationUtils.ts
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
    const navigate = useNavigate();

    const navigateToStakeholder = (stakeholderId: number): void => {
        navigate(`/stakeholder/${stakeholderId}`);
    };

    const navigateToInventoryItem = (itemId: number): void => {
        navigate(`/inventory/${itemId}`);
    };

    const navigateToPackage = (id: number): void => {
        navigate(`/packages/${id}`);
    };

    const navigateToDelivery = (id: number): void => {
        navigate(`/deliveries/${id}`);
    }

    return {
        navigateToStakeholder,
        navigateToInventoryItem,
        navigateToPackage,
        navigateToDelivery
    };
};

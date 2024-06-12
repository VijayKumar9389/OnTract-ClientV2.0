import { useParams } from "react-router-dom";
import SubPageHeading from "../../components/SubPageHeading/SubPageHeading.tsx";
import { cancelDeliveryById } from "../../services/delivery.services.ts";
import EditDeliveryForm from "./components/EditDeliveryForm/EditDeliveryForm.tsx";
import PackageTable from "./components/PackageTable/PackageTable.tsx";
import ConfirmationButton from "../../components/ConfirmationButton/ConfirmationButton.tsx";
import DeliveryDetails from "./components/DeliveryDetails/DeliveryDetails.tsx";
import {useGetDelivery} from "../../hooks/delivery.hooks.ts";

const DeliveryPage = () => {
    const { id } = useParams();
    const deliveryId = id ? parseInt(id) : null;
    const { delivery, loading, error } = useGetDelivery(deliveryId);

    const handleCancelDelivery = (): void => {
        if (delivery) {
            cancelDeliveryById(delivery.id)
                .then((): void => {
                    window.location.href = "/deliveries";
                });
        }
    };

    // Loading and error handling
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!delivery) {
        return <div>Loading...</div>
    }

    return (
        <div className="section">
            <SubPageHeading heading={delivery.destination} />
            <div className="page-content">
                <EditDeliveryForm delivery={delivery} />
                <DeliveryDetails delivery={delivery} />
                <PackageTable packages={delivery.packages} />
                <div className="btn-container">
                    <ConfirmationButton
                        buttonText="Cancel Delivery"
                        confirmationMessage="Are you sure you want to cancel this delivery?"
                        onConfirm={handleCancelDelivery} // Pass handleCancelDelivery directly
                    />
                </div>
            </div>
        </div>
    );
}

export default DeliveryPage;

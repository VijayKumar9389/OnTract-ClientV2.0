import {useParams} from "react-router-dom";
import SubPageHeading from "../../components/SubPageHeading/SubPageHeading.tsx";
import {cancelDeliveryById, undoDeliveryCompleted} from "../../services/delivery.services.ts";
import EditDeliveryForm from "./components/EditDeliveryForm/EditDeliveryForm.tsx";
import PackageTable from "./components/PackageTable/PackageTable.tsx";
import ConfirmationButton from "../../components/ConfirmationButton/ConfirmationButton.tsx";
import DeliveryDetails from "./components/DeliveryDetails/DeliveryDetails.tsx";
import {useGetDelivery} from "../../hooks/delivery.hooks.ts";
import {Delivery} from "../../models/delivery.models.ts";

const DeliveryPage = () => {
    const {id} = useParams();
    const deliveryId = id ? parseInt(id) : null;
    const {delivery, loading, error} = useGetDelivery(deliveryId);

    const handleCancelDelivery = (): void => {
        if (delivery) {
            cancelDeliveryById(delivery.id)
                .then((): void => {
                    window.location.href = "/deliveries";
                });
        }
    };

    const handleUndoDeliveryCompleted = () => async () => {
        if (!delivery) {
            return;
        }
        try {
            const response: Promise<Delivery> = undoDeliveryCompleted(delivery.id);
            console.log(response);
            window.location.reload()
        } catch (error) {
            console.error('Error undoing delivery completion:', error);
        }
    }


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
            <SubPageHeading heading={delivery.destination}/>
            <div className="page-content">
                <EditDeliveryForm delivery={delivery}/>
                <PackageTable packages={delivery.packages}/>
                <DeliveryDetails delivery={delivery}/>
                <div className="btn-container">
                    {delivery.completed && (
                        <ConfirmationButton
                            buttonText="Undo Completion"
                            confirmationMessage="Are you sure you want to undo the delivery completion?"
                            onConfirm={handleUndoDeliveryCompleted()}
                        />
                    )}
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

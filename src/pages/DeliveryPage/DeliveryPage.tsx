import './DeliveryPage.scss';
import { useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import { cancelDeliveryById, getDeliveryById } from "../../services/delivery.services.ts";
import { useEffect, useState } from "react";
import { Delivery } from "../../models/delivery.models.ts";
import EditDeliveryForm from "./components/EditDeliveryForm/EditDeliveryForm.tsx";
import PackageTable from "./components/PackageTable/PackageTable.tsx";
import ConfirmationButton from "../../components/ConfirmationButton/ConfirmationButton.tsx";
import DeliveryDetails from "./components/DeliveryDetails/DeliveryDetails.tsx";

const DeliveryPage = () => {
    const { id } = useParams();
    const [delivery, setDelivery] = useState<Delivery | null>(null);

    useEffect((): void => {
        if (id) {
            const deliveryId: number = parseInt(id);
            getDeliveryById(deliveryId)
                .then((response: Delivery): void => {
                    setDelivery(response);
                });
        }
    }, [id]);

    const handleCancelDelivery = (): void => {
        if (delivery) {
            cancelDeliveryById(delivery.id)
                .then((): void => {
                    window.location.href = "/deliveries";
                });
        }
    };

    if (!delivery) {
        return <div>Loading...</div>
    }

    return (
        <div className="delivery-page">
            <PageHeading heading={delivery.destination} />
            <div className="page-content">
                <DeliveryDetails delivery={delivery} />
                <EditDeliveryForm delivery={delivery} />
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

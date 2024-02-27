import './DeliveryPage.scss';
import {useParams} from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import {getDeliveryById} from "../../services/delivery.services.ts";
import {useEffect, useState} from "react";
import {Delivery} from "../../models/delivery.models.ts";

const DeliveryPage = () => {
    const {id} = useParams();
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

    if (!delivery) {
        return <div>Loading...</div>
    }

    return (
        <div className="delivery-page">
            <PageHeading heading={delivery.destination}/>
            <h1>{id}</h1>
        </div>
    );
}

export default DeliveryPage;
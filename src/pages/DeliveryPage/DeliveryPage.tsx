import './DeliveryPage.scss';
import {useParams} from "react-router-dom";

const DeliveryPage = () => {
    const {id} = useParams();

    return (
        <div className="delivery-page">
            <h1>Delivery Page</h1>
            <h1>{id}</h1>
        </div>
    );
}

export default DeliveryPage;
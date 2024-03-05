import './DeliveryCard.scss';
import React from "react";
import {Delivery} from "../../../../models/delivery.models.ts";
import {useNavigate} from "react-router-dom";
import {FaBox, FaInfoCircle, FaPhone, FaStickyNote} from "react-icons/fa";

const DeliveryCard: React.FC<{ delivery: Delivery }> = ({delivery}) => {

    const navigate = useNavigate();

    const selectDelivery = (delivery: Delivery): void => {
        navigate(`/deliveries/${delivery.id}`);
    }

    const isMailout = (method: string) => method === 'mail';
    const isPending = (status: string) => status === 'pending';

    return (
        <div className="delivery-card" onClick={() => selectDelivery(delivery)}>
            <div className="card-header">
                <h3>{delivery.destination}</h3>
                <p>{delivery.route}</p>
            </div>
            <div className="detail-list">
                <li>
                    <span><FaPhone/></span>
                    <div>
                        <p>Type:</p>
                        <a className="number">{isMailout(delivery.delivery_method) ? 'Mail-out' : 'In-Person'}</a>
                    </div>
                </li>
                <li>
                    <span><FaBox/></span>
                    <div>
                        <p>Packages:</p>
                        <a className="number">{delivery.packages.length}</a>
                    </div>
                </li>
                <li>
                    <span><FaInfoCircle/></span>
                    <div>
                        <p>Status:</p>
                        {isPending(delivery.status)
                            ? <a className="chip yellow">Pending</a>
                            : <a className="chip red">Completed</a>
                        }
                    </div>
                </li>

                <li>
                    <span><FaStickyNote/></span>
                    <div>
                        <p>Notes:</p>
                        <a className="number">{delivery.notes}</a>
                    </div>
                </li>
                {/*<div className="detail">*/}
                {/*    <span className="detail-icon"><FaStickyNote/></span>*/}
                {/*    <div>*/}
                {/*        <p className="detail-label">Notes:</p>*/}
                {/*        <p className="detail-value">{delivery.notes}</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );

}

export default DeliveryCard;

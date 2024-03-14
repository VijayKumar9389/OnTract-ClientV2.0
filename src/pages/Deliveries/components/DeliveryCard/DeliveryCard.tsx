import './DeliveryCard.scss';
import React from "react";
import {Delivery} from "../../../../models/delivery.models.ts";
import {FaBox, FaInfoCircle, FaPhone} from "react-icons/fa";
import {Navigation} from "../../../../utils/navigation.ts";

const DeliveryCard: React.FC<{ delivery: Delivery }> = ({delivery}) => {

    const {navigateToDelivery} = Navigation();

    const isMailout = (method: string) => method === 'mail';

    return (
        <div className="delivery-card" onClick={() => navigateToDelivery(delivery.id)}>
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
                        {!delivery.completed
                            ? <a className="chip red">Pending</a>
                            : <a className="chip green">Completed</a>
                        }
                    </div>
                </li>

                {/*<li>*/}
                {/*    <span><FaStickyNote/></span>*/}
                {/*    <div>*/}
                {/*        <p>Notes:</p>*/}
                {/*        <a className="number">{delivery.notes}</a>*/}
                {/*    </div>*/}
                {/*</li>*/}
            </div>
        </div>
    );

}

export default DeliveryCard;

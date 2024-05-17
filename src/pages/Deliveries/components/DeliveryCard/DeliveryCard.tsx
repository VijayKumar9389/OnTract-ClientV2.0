import React from "react";
import {Delivery} from "../../../../models/delivery.models.ts";
import {FaInfoCircle, FaTruck} from "react-icons/fa";
import {Navigation} from "../../../../utils/navigation.ts";
import {IoMdMail} from "react-icons/io";
import {IoPerson} from "react-icons/io5";
import {isMailout} from "../../../../utils/helpers.ts";

const DeliveryCard: React.FC<{ delivery: Delivery }> = ({delivery}) => {

    const {navigateToDelivery} = Navigation();

    return (
        <div className="card" onClick={() => navigateToDelivery(delivery.id)}>
            <div className="card-header">
                <h3>{delivery.destination}</h3>
                <p>{delivery.route}</p>
            </div>
            <div className="detail-list">
                <li>
                    {isMailout(delivery.delivery_method) ? <span><IoMdMail/></span> : <span><FaTruck/></span>}
                    <div>
                        <p>Type:</p>
                        <a className="number">{isMailout(delivery.delivery_method) ? 'Mailout' : 'In Person'}</a>
                    </div>
                </li>
                <li>
                    <span><IoPerson/></span>
                    <div>
                        <p>Stakeholders:</p>
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

            </div>
        </div>
    );

}

export default DeliveryCard;

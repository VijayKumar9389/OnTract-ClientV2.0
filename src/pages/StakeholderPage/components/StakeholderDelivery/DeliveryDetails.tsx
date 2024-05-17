import React from 'react';
import {Delivery} from '../../../../models/delivery.models.ts';
import {Navigation} from "../../../../utils/navigation.ts";
import {IoMdMail} from "react-icons/io";
import {FaInfoCircle, FaTruck} from "react-icons/fa";
import {IoPerson} from "react-icons/io5";
import {isMailout} from "../../../../utils/helpers.ts";

const DeliveryDetails: React.FC<{ delivery: Delivery }> = ({delivery}) => {
    const {navigateToDelivery} = Navigation();

    return (
        <div>
            <div>
                <div className="card-header">
                    <h3>{delivery.destination}</h3>
                    <p>{delivery.notes}</p>
                </div>
                <div className="btn-container">
                    <button onClick={() => navigateToDelivery(delivery.id)}>
                        View Delivery
                    </button>
                </div>
            </div>
            <div className="detail-list">
                <li>
                    {isMailout(delivery.delivery_method) ? <span><IoMdMail/></span> : <span><FaTruck/></span>}
                    <div>
                        <p>Type:</p>
                        <a className="number">{isMailout(delivery.delivery_method) ? 'Mail Out' : 'In Person'}</a>
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

            <table className="package-table">
                <thead>
                <tr>
                    <th>Package</th>
                    <th>Stakeholder</th>
                </tr>
                </thead>
                <tbody>
                {delivery.packages?.map((deliveryPackage) => (
                    <tr key={deliveryPackage.id}>
                        <td>
                            <span className="package-name">{deliveryPackage.packageType.name}</span>
                        </td>
                        <td>
                            <span className="stakeholder-name">{deliveryPackage.stakeholder.name}</span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


        </div>
    );
};

export default DeliveryDetails;

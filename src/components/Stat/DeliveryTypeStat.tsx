// Helper component for delivery type items
import React from "react";
import {IoMdMail} from "react-icons/io";
import {FaTruck} from "react-icons/fa";

export const DeliveryTypeItem: React.FC<{
    deliveryMethod: string;
    isMailout: (deliveryMethod: string) => boolean;
}> = ({
          deliveryMethod,
          isMailout
      }) => (
    <li>
        {isMailout(deliveryMethod) ? <span><IoMdMail/></span> : <span><FaTruck/></span>}
        <div>
            <p>Type:</p>
            <a className="number">{isMailout(deliveryMethod) ? 'Mailout' : 'In Person'}</a>
        </div>
    </li>
);
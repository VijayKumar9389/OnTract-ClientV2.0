import './NoDataMessage.scss';
import {FaExclamationTriangle} from "react-icons/fa";
import React from "react"; // Ensure you import the CSS file

const NoDataMessage: React.FC<{message: string}> = ({message}) => {
    return (
        <div className="no-data-message">
            <FaExclamationTriangle className="warning-icon" />
            <p>{message}</p>
        </div>
    );
};

export default NoDataMessage;

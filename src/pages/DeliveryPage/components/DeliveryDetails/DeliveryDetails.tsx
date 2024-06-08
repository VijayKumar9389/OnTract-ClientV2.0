import {setDeliveryCompleted} from "../../../../services/delivery.services.ts";
import {Delivery} from "../../../../models/delivery.models.ts";
import React, {useState} from "react";
import './DeliveryDetails.scss';
import {FaCheck} from "react-icons/fa6";

const DeliveryDetails: React.FC<{ delivery: Delivery }> = ({delivery}) => {
    const [selectedDate, setSelectedDate] = useState(delivery.date || "");

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Convert selectedDate to a Date object
            const dateObj = new Date(selectedDate);

            // Format the date as yyyy-mm-dd (required by HTML5 date input)
            const formattedDate = dateObj.toISOString().split('T')[0];

            // Update delivery.completed to true
            const response = await setDeliveryCompleted(delivery.id, formattedDate);
            console.log(response);

            // Update state or provide feedback to the user (e.g., show a success message)
            setSelectedDate(formattedDate);
            window.location.reload()

        } catch (error) {
            console.error('Error setting completion date:', error);
            // Optionally, handle error (e.g., show an error message to the user)
        }
    };

    // Disable the button if no date is selected or if the selected date is the same as the current delivery date
    const isValid: boolean = selectedDate !== "" && selectedDate !== delivery.date;


    return (
        <div className="panel">
            <div className="panel-header">
                <h3>Delivery Status</h3>
            </div>
            <div className="panel-content">
                <p className="info-list">
                    Status: <span className="info-item">{delivery.completed ? <a>Completed</a> : <a>Pending</a>}</span>
                    <span className="separator">|</span>
                    Completion Date: <span className="info-item">{delivery.date ? delivery.date : <a>N/A</a>}</span>
                </p>
                <form onSubmit={handleSubmit} className="date-form">
                    <div className="input-wrapper">
                        <label htmlFor="deliveryDate">Completion Date:</label>
                        <div className="submit-wrapper">
                            <input
                                type="date"
                                id="deliveryDate"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className="date-input"
                            />
                            <button type="submit" disabled={!isValid}>
                                <FaCheck/>
                                Set Completion Date
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default DeliveryDetails;
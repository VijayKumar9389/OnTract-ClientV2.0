import React, {useState} from "react";
import {Delivery} from "../../../../models/delivery.models.ts";
import {setDeliveryCompleted} from "../../../../services/delivery.services.ts";
import './DeliveryDetails.scss';

const DeliveryDetails: React.FC<{ delivery: Delivery }> = ({delivery}) => {
    const [selectedDate, setSelectedDate] = useState(delivery.date || "");

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Convert selectedDate to a Date object
        const dateObj = new Date(selectedDate);

        // Extract month, day, and year
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(dateObj.getDate() + 1).padStart(2, '0'); // Add 1 to the day
        const year = String(dateObj.getFullYear());

        // Format the date as mm/dd/yyyy
        const formattedDate = `${month}/${day}/${year}`;

        // Now you can send the formattedDate to your backend
        console.log("Formatted Date:", formattedDate);

        // Update delivery.completed to true
        setDeliveryCompleted(delivery.id, formattedDate).then(response => {
            console.log(response);

            // Optionally, provide feedback to the user (e.g., show a success message)
            window.location.reload(); // Reload the page after successful update (consider alternatives like updating state instead)
        });
    };


    return (
        <div className="delivery-details">
            <div className="info-list">
                <label className="panel-label">Delivery Status</label>
                <p className="info-list">
                    Status: <span className="info-item">{delivery.completed ? <a>Completed</a> : <a>Pending</a>}</span>
                    <span className="separator">|</span>
                    Completion Date: <span className="info-item">{delivery.date ? delivery.date : <a>N/a</a>}</span>
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="deliveryDate">Date:
                            <input
                                type="date"
                                id="deliveryDate"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </label>
                    </div>
                    <button type="submit" className="edit-button">Set Completion Date</button>
                </form>
            </div>
        </div>
    );
}

export default DeliveryDetails;

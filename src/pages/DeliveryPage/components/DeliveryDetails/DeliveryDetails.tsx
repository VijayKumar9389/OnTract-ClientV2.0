import {showToastSuccess} from "../../../../utils/toastHelper.ts";
import {setDeliveryCompleted} from "../../../../services/delivery.services.ts";
import {Delivery} from "../../../../models/delivery.models.ts";
import {useState} from "react";
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
            showToastSuccess('Delivery completion date set successfully');

            // Instead of reloading the entire page, consider updating state to reflect the changes
            // window.location.reload();
        } catch (error) {
            console.error('Error setting completion date:', error);
            // Optionally, handle error (e.g., show an error message to the user)
        }
    };

    // Disable the button if no date is selected
    const isDateSelected = selectedDate !== "";

    return (
        <div className="delivery-details">
            <div className="delivery-info">
                <form onSubmit={handleSubmit} className="date-form">
                    <div className="input-wrapper">
                        <label htmlFor="deliveryDate">Completion Date:</label>
                        <input
                            type="date"
                            id="deliveryDate"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="date-input"
                        />
                    </div>
                    <button type="submit" disabled={!isDateSelected}>
                        <FaCheck/>
                        Set Completion Date
                    </button>
                </form>
                <p className="info-list">
                    Status: <span className="info-item">{delivery.completed ? <a>Completed</a> : <a>Pending</a>}</span>
                    <span className="separator">|</span>
                    Completion Date: <span className="info-item">{delivery.date ? delivery.date : <a>N/a</a>}</span>
                </p>
            </div>
        </div>
    );

}

export default DeliveryDetails;
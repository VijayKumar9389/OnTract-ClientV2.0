import {useState, FC, useEffect} from 'react';
import './ConfirmationButton.scss';
import {FaWindowClose} from "react-icons/fa";

interface ConfirmationButtonProps {
    buttonText: string;
    confirmationMessage: string;
    onConfirm: () => void;
}

const ConfirmationButton: FC<ConfirmationButtonProps> = ({ buttonText, confirmationMessage, onConfirm }) => {
    const [isConfirming, setIsConfirming] = useState(false);

    useEffect(() => {
        const handleBodyScroll = (event: Event): void => {
            event.preventDefault();
        };

        if (isConfirming) {
            document.body.classList.add('popup-open');
            document.body.addEventListener('touchmove', handleBodyScroll, { passive: false });
            document.body.addEventListener('wheel', handleBodyScroll, { passive: false });
        } else {
            document.body.classList.remove('popup-open');
            document.body.removeEventListener('touchmove', handleBodyScroll);
            document.body.removeEventListener('wheel', handleBodyScroll);
        }

        return (): void => {
            document.body.classList.remove('popup-open');
            document.body.removeEventListener('touchmove', handleBodyScroll);
            document.body.removeEventListener('wheel', handleBodyScroll);
        };
    }, [isConfirming]);

    const handleConfirm = (): void => {
        setIsConfirming(true);
    };

    const handleCancel = (): void => {
        setIsConfirming(false);
    };

    const handleConfirmation = (): void => {
        setIsConfirming(false);
        onConfirm();
    };

    return (
        <>
            <button className="btn-danger" onClick={handleConfirm}>{buttonText}</button>
            {isConfirming && (
                <div className="confirmation-modal">
                    <div className="confirmation-content">
                        <p>{confirmationMessage}</p>
                        <div className="button-container">
                            <button className="confirm-button" onClick={handleConfirmation}>Confirm</button>
                            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                        </div>
                        <button className="close-button" onClick={handleCancel}><FaWindowClose /></button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConfirmationButton;


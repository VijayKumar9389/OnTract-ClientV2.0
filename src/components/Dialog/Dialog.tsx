import './Dialog.scss';
import React from "react";
import {MdClose} from "react-icons/md";

interface DialogProps {
    isOpen: boolean;
    toggle: () => void;
    element: JSX.Element;
    heading: string;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, toggle, element, heading }) => {
    if (isOpen) {
        return (
            <div className="popup-overlay" onClick={toggle}>
                <div className="popup-menu" onClick={(e) => e.stopPropagation()}>
                    <div className="popup-header">
                        <h3>{heading}</h3>
                        <button className="close-btn" onClick={toggle}><MdClose /></button>
                    </div>
                    <div className="popup-content">
                        {element}
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default Dialog;
import './Dialog.scss';
import React, {useEffect} from "react";
import {MdClose} from "react-icons/md";

interface DialogProps {
    isOpen: boolean;
    toggle: () => void;
    element: JSX.Element;
    heading: string;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, toggle, element, heading }) => {
    useEffect(() => {
        const handleBodyScroll = (event: Event) => {
            event.preventDefault();
        };

        if (isOpen) {
            document.body.classList.add("popup-open");
            document.body.addEventListener("touchmove", handleBodyScroll, { passive: false });
            document.body.addEventListener("wheel", handleBodyScroll, { passive: false });
        }

        return (): void => {
            document.body.classList.remove("popup-open");
            document.body.removeEventListener("touchmove", handleBodyScroll);
            document.body.removeEventListener("wheel", handleBodyScroll);
        };
    }, [isOpen]);

    if (isOpen) {
        return (
            <div className="popup-overlay" onClick={toggle}>
                <div className="popup-menu" onClick={(e) => e.stopPropagation()}>
                    <div className="popup-header">
                        <h3>{heading}</h3>
                        <button onClick={toggle}><MdClose /></button>
                    </div>
                    {element}
                </div>
            </div>
        );
    }

    return null;
}

export default Dialog;
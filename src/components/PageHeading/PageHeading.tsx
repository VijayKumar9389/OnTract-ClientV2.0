import './PageHeading.scss';
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const PageHeading: React.FC<{ heading: string }> = ({heading}) => {
    return (
        <div className="page-heading">
            <button onClick={() => window.history.back()} className="back-btn">
                <FaArrowLeft/>
            </button>
            <h2>{heading}</h2>
        </div>
    );
}

export default PageHeading;
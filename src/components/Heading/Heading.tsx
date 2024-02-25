import './Heading.scss';
import React, {useState} from "react";
import { IoMdSwitch } from "react-icons/io";
import Dialog from "../Dialog/Dialog.tsx";
import ProjectTable from "../ProjectTable/ProjectTable.tsx";

const Heading: React.FC<{heading: string}> = ({heading}) => {
    const [isOpened, setIsOpened] = useState(false);

    const toggleMenu = (): void => {
        setIsOpened(!isOpened);
    };


    return (
        <div className="heading">
            <h2>{heading}</h2>
            <button onClick={toggleMenu}>
                <IoMdSwitch /> Switch Project
            </button>
            <Dialog isOpen={isOpened} toggle={toggleMenu} element={<ProjectTable toggleMenu={() => toggleMenu()} />} heading={"Select Project"} />
        </div>
    );
}

export default Heading;


import './Heading.scss';
import React, {useState} from "react";
import { IoMdSwitch } from "react-icons/io";
import Dialog from "../Dialog/Dialog.tsx";
import ProjectTable from "../ProjectTable/ProjectTable.tsx";
import {getProjectFromCookie} from "../../utils/project.helper.ts";

const Heading: React.FC<{heading: string}> = ({heading}) => {
    const [isOpened, setIsOpened] = useState(false);
    const project = getProjectFromCookie();

    const toggleMenu = (): void => {
        setIsOpened(!isOpened);
    };

    if (!project) return null;

    return (
        <div className="heading">
            <h2>{heading} For <strong>{project.name} {project.year}</strong></h2>
            <button onClick={toggleMenu}>
                <IoMdSwitch /> Switch Project
            </button>
            <Dialog isOpen={isOpened} toggle={toggleMenu} element={<ProjectTable toggleMenu={() => toggleMenu()} />} heading={"Select Project"} />
        </div>
    );
}

export default Heading;


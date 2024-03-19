import CreateProject from "./components/CreateProject/CreateProject.tsx";
import {useEffect, useState} from "react";
import Dialog from "../../components/Dialog/Dialog.tsx";
import {getProjects} from "../../services/project.services.ts";
import ProjectInfoTable from "./components/ProjectInfoTable/ProjectInfoTable.tsx";
import {Project} from "../../models/stakeholder.models.ts";
import {FaPlus} from "react-icons/fa6";
import {FaProjectDiagram} from "react-icons/fa";

const Projects = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect((): void => {
        getProjects().then((res): void => {
            setProjects(res);
        });
    }, []);

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className="section">
            <div className="page-content">
                <Dialog isOpen={isMenuOpen} toggle={toggleMenu} element={<CreateProject/>} heading={"Create Project"}/>
                <div className="header">
                    <h3><FaProjectDiagram/> PROJECTS (<strong>{projects.length}</strong>)</h3>
                    <button onClick={toggleMenu}>
                        <FaPlus/>
                        Create Project
                    </button>
                </div>
                <div className="panel">
                    <div className="panel-content">
                        <ProjectInfoTable projects={projects}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
import CreateProject from "./components/CreateProject/CreateProject.tsx";
import {useEffect, useState} from "react";
import Dialog from "../../components/Dialog/Dialog.tsx";
import {getProjects} from "../../services/project.services.ts";
import ProjectInfoTable from "./components/ProjectInfoTable/ProjectInfoTable.tsx";
import {Project} from "../../models/stakeholder.models.ts";
import {FaPlus} from "react-icons/fa6";

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
                <div className="sub-header">
                    <button onClick={toggleMenu}>
                        <FaPlus/>
                        Create Project
                    </button>
                    <p>Results: <strong>{projects.length}</strong></p>
                </div>
                <div className="panel">
                    <div className="panel-header">
                        <h3>PROJECTS</h3>
                    </div>
                    <div className="panel-content">

                        <div className="table-wrapper">
                            <ProjectInfoTable projects={projects}/>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                isOpen={isMenuOpen}
                toggle={toggleMenu}
                element={<CreateProject/>}
                heading={"Create Project"}
            />
        </div>
    );
}

export default Projects;
import Heading from "../../components/Heading/Heading.tsx";
import CreateProject from "./components/CreateProject/CreateProject.tsx";
import {useEffect, useState} from "react";
import Dialog from "../../components/Dialog/Dialog.tsx";
import {getProjects} from "../../services/project.services.ts";
import ProjectList from "./components/ProjectList/ProjectList.tsx";
import {Project} from "../../models/stakeholder.models.ts";

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
        <div>
            <Heading heading="Projects"/>
            <div className="page-content">

                <Dialog isOpen={isMenuOpen} toggle={toggleMenu} element={<CreateProject />} heading={"Create Project"} />

                <div className="panel">
                    <div className="panel-header">
                        <label className="panel-label">Projects</label>
                    </div>
                    <div className="panel-content">
                        <div className="btn-container">
                            <button onClick={() => toggleMenu()}>Add Project</button>
                        </div>
                        <ProjectList projects={projects} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
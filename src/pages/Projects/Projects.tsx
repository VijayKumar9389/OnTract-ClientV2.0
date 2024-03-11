import ProjectTable from "../../components/ProjectTable/ProjectTable.tsx";
import Heading from "../../components/Heading/Heading.tsx";
import CreateProject from "./components/CreateProject/CreateProject.tsx";
import {useState} from "react";
import Dialog from "../../components/Dialog/Dialog.tsx";


const Projects = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <ProjectTable toggleMenu={() => {
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
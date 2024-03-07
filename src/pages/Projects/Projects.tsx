import ProjectTable from "../../components/ProjectTable/ProjectTable.tsx";
import Heading from "../../components/Heading/Heading.tsx";


const Projects = () => {

    return (
        <div>
            <Heading heading="Projects"/>
            <div className="page-content">
                <div className="panel">
                    <div className="panel-header">
                        <label className="panel-label">Projects</label>
                    </div>
                    <div className="panel-content">
                        <div className="btn-container">
                            <button>Add Project</button>
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
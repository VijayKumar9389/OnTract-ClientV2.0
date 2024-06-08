import React from "react";
import { Project } from "../../models/stakeholder.models";
import { setProjectCookie } from "../../utils/cookieHelper";
import CreateProject from "../../pages/Projects/components/CreateProject/CreateProject";
import { useFetchProjects} from "../../hooks/project.hooks.ts";
import './ProjectTable.scss';

interface ProjectTableProps {
    toggleMenu: () => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ toggleMenu }) => {
    const { projects, loading, error } = useFetchProjects();

    const selectProject = (project: Project): void => {
        setProjectCookie(project);
        if (toggleMenu) toggleMenu();
        window.location.reload();
    };

    return (
        <div className="project-select">
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && projects.length === 0 && <CreateProject />}
            {!loading && !error && projects.length > 0 && (
                <table className="project-table">
                    <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Year</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projects.map((project: Project) => (
                        <tr key={project.id} className="project-row" onClick={() => selectProject(project)}>
                            <td>{project.name}</td>
                            <td>{project.year}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProjectTable;

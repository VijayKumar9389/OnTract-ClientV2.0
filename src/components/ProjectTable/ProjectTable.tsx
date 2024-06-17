import React from "react";
import { Project } from "../../models/stakeholder.models";
import { setProjectCookie } from "../../utils/cookie.utils.ts";
import CreateProject from "../../pages/Projects/components/CreateProject/CreateProject";
import { useFetchProjects} from "../../hooks/project.hooks.ts";
import './ProjectTable.scss';
import {clearStakeholderState} from "../../store/reducers/stakeholder.reducer.ts";
import {clearDeliveryState} from "../../store/reducers/delivery.reducer.ts";
import {useDispatch} from "react-redux";

interface ProjectTableProps {
    toggleMenu: () => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ toggleMenu }) => {
    const { projects, loading, error } = useFetchProjects();
    const dispatch = useDispatch();

    // Clear the filter state
    const clearFilter = (): void => {
        dispatch(clearStakeholderState());
        dispatch(clearDeliveryState());
    };

    const selectProject = (project: Project): void => {
        setProjectCookie(project);
        if (toggleMenu) toggleMenu();
        clearFilter();
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

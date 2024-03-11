import {useState, useEffect} from "react";
import React from "react";
import {Project} from "../../models/stakeholder.models.ts";
import './ProjectTable.scss';
import {setProjectCookie} from "../../utils/project.helper.ts";
import {getProjects} from "../../services/project.services.ts";

const ProjectTable: React.FC<{ toggleMenu: () => void }> = ({toggleMenu}) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (): Promise<void> => {
        try {
            const response = await getProjects();
            setProjects(response);
        } catch (error) {
            setError("An error occurred while fetching projects.");
        } finally {
            setLoading(false);
        }
    };

    useEffect((): void => {
        fetchData();
    }, []);

    const selectProject = (project: Project): void => {
        setProjectCookie(project)
        if (toggleMenu) toggleMenu();
        window.location.reload();
    }

    return (
        <div>
            {loading && <p>Loading...</p>}

            {error && <p style={{color: "red"}}>{error}</p>}

            {!loading && !error && (
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
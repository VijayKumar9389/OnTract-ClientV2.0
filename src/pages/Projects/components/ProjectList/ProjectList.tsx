// ProjectList.tsx

import React from "react";
import { Project } from "../../../../models/stakeholder.models.ts";
import "./ProjectList.scss";

const ProjectList: React.FC<{ projects: Project[] }> = ({ projects }) => {
    return (
        <ul className="project-list">
            {projects.map((project: Project) => (
                <li key={project.id} className="project-list-item">
                    <span className="project-name">{project.name}</span>
                    <div className="project-details">
                        <span className="project-year">{project.year}</span>
                        <span className="project-notes">{project.notes}</span>
                        <span className="project-survey-link">{project.surveyLink}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ProjectList;

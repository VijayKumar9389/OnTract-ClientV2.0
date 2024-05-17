// ProjectInfoTable.jsx
import React from "react";
import { Project } from "../../../../models/stakeholder.models.ts";
import ProjectInfoTableRow from "./ProjectInfoTableRow";

const ProjectInfoTable: React.FC<{ projects: Project[] }> = ({ projects }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Year</th>
                <th>Notes</th>
                <th>Survey Link</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project: Project) => (
                <ProjectInfoTableRow key={project.id} project={project} />
            ))}
            </tbody>
        </table>
    );
};

export default ProjectInfoTable;

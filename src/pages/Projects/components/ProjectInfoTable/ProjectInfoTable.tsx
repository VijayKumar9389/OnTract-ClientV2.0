import React from "react";
import { Project } from "../../../../models/stakeholder.models.ts";

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
                <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{project.year}</td>
                    <td>{project.notes}</td>
                    <td>{project.surveyLink}</td>
                    <td>
                        <div className="action-buttons">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ProjectInfoTable;

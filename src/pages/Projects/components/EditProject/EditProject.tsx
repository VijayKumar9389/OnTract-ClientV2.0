import React, { useState } from "react";
import { editProject } from "../../../../services/project.services.ts";
import { Project } from "../../../../models/stakeholder.models.ts";
import { EditProjectInputDTO } from "../../../../models/project.models.ts";

const EditProject: React.FC<{ project: Project }> = ({ project }) => {
    const [formData, setFormData] = useState<EditProjectInputDTO>({
        name: project.name,
        year: project.year,
        notes: project.notes,
        surveyLink: project.surveyLink
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "year" ? parseInt(value, 10) : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await editProject(project.id, formData);
            console.log("Project updated successfully");
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="input-wrapper">
                <label>Year:</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} />
            </div>

            <div className="input-wrapper">
                <label>Notes:</label>
                <input type="text" name="notes" value={formData.notes} onChange={handleChange} />
            </div>

            <div className="input-wrapper">
                <label>Survey Link:</label>
                <input type="text" name="surveyLink" value={formData.surveyLink} onChange={handleChange} />
            </div>

            <button className="form-btn" type="submit">Save</button>
        </form>
    );
};

export default EditProject;

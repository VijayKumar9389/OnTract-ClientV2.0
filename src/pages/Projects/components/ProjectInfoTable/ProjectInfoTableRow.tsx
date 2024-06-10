import React from "react";
import {Project} from "../../../../models/stakeholder.models.ts";
import {deleteProject, downloadProject} from "../../../../services/project.services.ts";
import Dialog from "../../../../components/Dialog/Dialog.tsx";
import EditProject from "../EditProject/EditProject.tsx";
import {useState} from "react";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton.tsx";

const ProjectInfoTableRow: React.FC<{ project: Project }> = ({project}) => {
    const {id, name, year, notes, surveyLink} = project;
    const [isEditOpen, setIsEditOpen] = useState(false);


    const toggleEdit = (): void => {
        setIsEditOpen(!isEditOpen);
    }

    const handleDelete = async () => {
        try {
            await deleteProject(id);
            console.log('Project deleted successfully');
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }

    const handleDownload = async (projectId: number): Promise<void> => {
        try {
            const data = await downloadProject(projectId);

            // Create a blob from the received data
            const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link element
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tract_records.xlsx';

            // Append the link to the body
            document.body.appendChild(a);

            // Trigger click on the link to start download
            a.click();

            // Remove the link from the body
            document.body.removeChild(a);

            // Release the URL
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading project:', error);
        }
    };

    return (
        <>
            <Dialog heading={"Edit Project"} isOpen={isEditOpen} toggle={toggleEdit}
                    element={<EditProject project={project}/>}/>
            <tr>
                <td>{name}</td>
                <td>{year}</td>
                <td>{notes}</td>
                <td>{surveyLink}</td>
                <td>
                    <div className="action-buttons">
                        <button onClick={() => toggleEdit()}>Edit</button>
                        <button onClick={() => handleDownload(project.id)}>Download</button>
                        <ConfirmationButton
                            buttonText={"Delete Project"}
                            confirmationMessage={`Are you sure you want to delete ${project.name + ' ' + project.year}?`}
                            onConfirm={handleDelete}
                        />
                    </div>
                </td>
            </tr>
        </>
    );
};

export default ProjectInfoTableRow;

import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

interface ProjectRecordInput {
    position: number;
    tract: number;
    pin: string;
    structure: string;
    interest: string;
    stakeholderStatus: string;
    name: string;
    streetAddress: string;
    mailingAddress: string;
    phoneNumber: string;
    occupants: number;
    worksLand: string;
    contacted: string;
    attempts: string;
    consultation: string;
    followUp: string;
    tractComments: string;
    pageNo: string;
    keepDelete: string;
    email: string;
    Commodity: string;
    pipelineStatus: string;
    isPerson: string;
    stakeholderComments: string;
}

const CreateProject = () => {
    const [projectForm, setProjectForm] = useState({
        projectName: '',
        projectYear: new Date().getFullYear(),
        projectNotes: '',
        projectSurveyLink: '',
        fileInput: null
    });
    const [jsonData, setJsonData] = useState<ProjectRecordInput[] | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file: File | undefined = event.target.files?.[0];
        if (!file) return;

        const reader: FileReader = new FileReader();

        reader.onload = (): void => {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData: string[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) ;

            const projectRecords: ProjectRecordInput[] = jsonData.slice(1).map((row: string, index: number): ProjectRecordInput => ({
                position: index,
                tract: parseInt(row[0], 10) || 0,
                pin: row[1] || '',
                structure: row[2] || '',
                interest: row[3] || '',
                stakeholderStatus: row[4] || '',
                name: row[5] || '',
                streetAddress: row[6] || '',
                mailingAddress: row[7] || '',
                phoneNumber: row[8] || '',
                occupants: parseInt(row[9], 10) || 0,
                worksLand: row[10] || '',
                contacted: row[11] || '',
                attempts: row[12] || '',
                consultation: row[13] || '',
                followUp: row[14] || '',
                tractComments: row[15] || '',
                pageNo: row[16] || '',
                keepDelete: row[17] || '',
                email: row[18] || '',
                Commodity: row[19] || '',
                pipelineStatus: row[20] || '',
                isPerson: '',
                stakeholderComments: '',
            }));

            setJsonData(projectRecords);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleSaveClick = () => {
        console.log('Saving project...');
        const projectName = projectForm.projectName;
        const projectYear = projectForm.projectYear;
        const projectNotes = projectForm.projectNotes;
        const projectSurveyLink = projectForm.projectSurveyLink;

        if (jsonData && jsonData.length > 0) {

            const projectRecords = jsonData.map((record) => ({
                tract: record.tract,
                position: record.position,
                pin: record.pin,
                structure: record.structure,
                interest: record.interest,
                stakeholderStatus: record.stakeholderStatus,
                name: record.name,
                streetAddress: record.streetAddress,
                mailingAddress: record.mailingAddress,
                phoneNumber: record.phoneNumber,
                occupants: record.occupants,
                worksLand: record.worksLand,
                contacted: record.contacted,
                attempts: record.attempts,
                consultation: record.consultation,
                followUp: record.followUp,
                tractComments: record.tractComments,
                pageNo: record.pageNo,
                keepDelete: record.keepDelete,
                email: record.email,
                Commodity: record.Commodity,
                pipelineStatus: record.pipelineStatus,
                isPerson: record.isPerson,
                stakeholderComments: record.stakeholderComments,
            }));

            const projectInput = {
                name: projectName,
                year: projectYear,
                notes: projectNotes,
                surveyLink: projectSurveyLink,
                projectRecords: projectRecords,
            };

            console.log(projectInput);

            axios.post('http://localhost:3005/project/create', projectInput)
                .then((response) => {
                    console.log('Project created successfully', response.data);
                })
                .catch((error) => {
                    console.error('Error creating project', error);
                });
        }
    };

    return (
        <div>
            <h1>Create Project</h1>
            <div className="project-details">
                <label>Project Name:</label>
                <input
                    type="text"
                    value={projectForm.projectName}
                    onChange={(e) => setProjectForm({...projectForm, projectName: e.target.value})}
                />

                <label>Year:</label>
                <input
                    type="number"
                    value={projectForm.projectYear}
                    onChange={(e) => setProjectForm({...projectForm, projectYear: parseInt(e.target.value, 10)})}
                />

                <label>Project Notes:</label>
                <input
                    type="text"
                    value={projectForm.projectNotes}
                    onChange={(e) => setProjectForm({...projectForm, projectNotes: e.target.value})}
                />

                <label>Survey Link:</label>
                <input
                    type="text"
                    value={projectForm.projectSurveyLink}
                    onChange={(e) => setProjectForm({...projectForm, projectSurveyLink: e.target.value})}
                />
            </div>

            <input type="file" onChange={handleFileUpload}/>

            <button onClick={handleSaveClick}>Save</button>

            {jsonData && jsonData.length > 0 &&
                <div>
                    <h2>Processed Data</h2>
                    <table>
                        <thead>
                        <tr>
                            {Object.keys(jsonData[0]).map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {jsonData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default CreateProject;
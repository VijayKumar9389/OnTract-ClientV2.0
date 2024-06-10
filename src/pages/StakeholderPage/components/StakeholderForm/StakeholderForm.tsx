import {Project, Stakeholder, UpdateStakeholderInput} from '../../../../models/stakeholder.models.ts';
import {updateStakeholder} from "../../../../services/stakeholder.services.ts";
import {useEffect, useState} from 'react';
import {FaRegSave} from 'react-icons/fa';
import {showToastError} from "../../../../utils/toast.utils.ts";
import {getProjectFromCookie} from "../../../../utils/cookie.utils.ts";
import {FcSurvey} from "react-icons/fc";

const StakeholderForm: React.FC<{ stakeholder: Stakeholder }> = ({stakeholder}) => {
    const [formData, setFormData] = useState<UpdateStakeholderInput>({
        name: stakeholder.name,
        streetAddress: stakeholder.streetAddress,
        mailingAddress: stakeholder.mailingAddress,
        phoneNumber: stakeholder.phoneNumber,
        isPerson: stakeholder.isPerson,
        stakeholderComments: stakeholder.stakeholderComments,
        stakeholderStatus: stakeholder.stakeholderStatus,
        contacted: stakeholder.contacted,
        consultation: stakeholder.consultation,
        attempts: stakeholder.attempts,
        email: stakeholder.email,
        followUp: stakeholder.followUp,
    });

    const project: Project | null = getProjectFromCookie();

    // Update the form data when the stakeholder changes
    useEffect((): void => {
        setFormData({
            name: stakeholder.name,
            streetAddress: stakeholder.streetAddress,
            mailingAddress: stakeholder.mailingAddress,
            phoneNumber: stakeholder.phoneNumber,
            isPerson: stakeholder.isPerson === 'YES' ? 'YES' : 'NO',
            stakeholderComments: stakeholder.stakeholderComments,
            stakeholderStatus: stakeholder.stakeholderStatus,
            contacted: stakeholder.contacted === 'YES' ? 'YES' : 'NO',
            consultation: stakeholder.consultation,
            attempts: stakeholder.attempts,
            email: stakeholder.email,
            followUp: stakeholder.followUp,
        });
    }, [stakeholder]);

    // Check if the form data has changed
    const hasDataChanged = (): boolean => {
        return (
            formData.name !== stakeholder.name ||
            formData.streetAddress !== stakeholder.streetAddress ||
            formData.mailingAddress !== stakeholder.mailingAddress ||
            formData.phoneNumber !== stakeholder.phoneNumber ||
            formData.isPerson !== (stakeholder.isPerson === 'YES' ? 'YES' : 'NO') ||
            formData.stakeholderComments !== stakeholder.stakeholderComments ||
            formData.stakeholderStatus !== stakeholder.stakeholderStatus ||
            formData.contacted !== (stakeholder.contacted === 'YES' ? 'YES' : 'NO') ||
            formData.consultation !== stakeholder.consultation ||
            formData.attempts !== stakeholder.attempts ||
            formData.email !== stakeholder.email ||
            formData.followUp !== stakeholder.followUp
        );
    }

    const goToProjectLink = (): void => {
        if (!project) {
            console.error('Project not found');
            return;
        }

        // Ensure the URL starts with 'http://' or 'https://'
        const surveyLink = project.surveyLink.startsWith('http://') || project.surveyLink.startsWith('https://')
            ? project.surveyLink
            : `https://${project.surveyLink}`;

        // Open the link in a new tab
        window.open(surveyLink, '_blank');
    };



    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Add a date to the attempts field
    const addAttempt = (): void => {
        const date = new Date().toLocaleDateString();
        const updatedAttempts = formData.attempts ? `${formData.attempts}, ${date}` : date;
        setFormData((prevData) => ({
            ...prevData,
            attempts: updatedAttempts,
        }));
    };

    // Set a date to the consultation field
    const stampDate = (): void => {
        const date = new Date().toLocaleDateString();
        setFormData((prevData) => ({
            ...prevData,
            consultation: date,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            const response: void = await updateStakeholder(stakeholder.id, formData);
            console.log('Stakeholder updated successfully', response);
            window.location.reload();
        } catch (error) {
            console.error('Error submitting form:', error);
            showToastError('Failed to update stakeholder');
        }
    };

    return (
        <div className="form-wrapper">
            <div className="form-row">
                <div className="input-wrapper">
                    <label htmlFor="name">Name:</label>
                    <textarea id="name" name="name" value={formData.name} onChange={handleChange}/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="stakeholderComments">Stakeholder Comments:</label>
                    <textarea
                        id="stakeholderComments"
                        name="stakeholderComments"
                        value={formData.stakeholderComments}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="input-wrapper">
                    <label htmlFor="mailingAddress">Mailing Address:</label>
                    <textarea
                        id="mailingAddress"
                        name="mailingAddress"
                        value={formData.mailingAddress}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="streetAddress">Street Address:</label>
                    <textarea
                        id="streetAddress"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="input-wrapper">
                    <label htmlFor="email">Email:</label>
                    <textarea id="email" name="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <textarea
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">

                <div className="input-wrapper">
                    <label htmlFor="contacted">
                        Contacted:
                    </label>
                    <input
                        type="checkbox"
                        id="contacted"
                        name="contacted"
                        checked={formData.contacted === 'YES'}
                        onChange={(e) => {
                            const newValue = e.target.checked ? 'YES' : 'NO';
                            setFormData((prevData) => ({
                                ...prevData,
                                contacted: newValue,
                            }));
                        }}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="isPerson">Is Person:</label>
                    <div>
                        <input
                            type="checkbox"
                            id="isPerson"
                            name="isPerson"
                            checked={formData.isPerson === 'YES'}
                            onChange={(e) => {
                                const newValue = e.target.checked ? 'YES' : 'NO';
                                setFormData((prevData) => ({
                                    ...prevData,
                                    isPerson: newValue,
                                }));
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="input-wrapper">
                    <div className="btn-label">
                        <label>
                            Attempts:
                        </label>
                        <button type="button" onClick={addAttempt}>Add Attempt</button>
                    </div>
                    <input type="text" name="attempts" value={formData.attempts} onChange={handleChange}/>
                </div>
                <div className="input-wrapper">
                    <div className="btn-label">
                        <label>
                            Consultation:
                        </label>
                        <button type="button" onClick={stampDate}>Stamp Date</button>
                    </div>
                    <input
                        type="text"
                        name="consultation"
                        value={formData.consultation}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="input-wrapper">
                    <label htmlFor="stakeholderStatus">Stakeholder Status:</label>
                    <select
                        id="stakeholderStatus"
                        name="stakeholderStatus"
                        value={formData.stakeholderStatus}
                        onChange={handleChange}
                    >
                        <option value="GREEN">GREEN</option>
                        <option value="YELLOW">YELLOW</option>
                        <option value="RED">RED</option>
                    </select>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="followUp">Follow Up:</label>
                    <input
                        type="text"
                        id="followUp"
                        name="followUp"
                        value={formData.followUp}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="btn-wrapper">
                <button disabled={!hasDataChanged()} onClick={(event) => handleSubmit(event)}>
                    <FaRegSave/> Save
                </button>
                <button type={"button"} onClick={() => goToProjectLink()}>
                    <FcSurvey/> Survey
                </button>
            </div>
        </div>
    );
};

export default StakeholderForm;

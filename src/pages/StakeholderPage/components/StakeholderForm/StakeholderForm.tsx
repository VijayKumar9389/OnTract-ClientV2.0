import './StakeholderForm.scss';
import {Stakeholder, UpdateStakeholderInput} from '../../../../models/stakeholder.models.ts';
import {updateStakeholder} from "../../../../services/stakeholder.services.ts";
import {useEffect, useState} from 'react';
import {FaRegSave} from 'react-icons/fa';
import {showToastError} from "../../../../utils/toastHelper.ts";

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

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            const response = await updateStakeholder(stakeholder.id, formData);
            console.log('Stakeholder updated successfully', response);
            window.location.reload();
        } catch (error) {
            console.error('Error submitting form:', error);
            showToastError('Failed to update stakeholder');
        }
    };

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Details</label>
            </div>
            <div className="panel-content">
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

                <button className="form-btn" onClick={(event) => handleSubmit(event)}>
                    <FaRegSave/> Save
                </button>
            </div>
        </div>
    );
};

export default StakeholderForm;

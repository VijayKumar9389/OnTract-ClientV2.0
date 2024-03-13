import './StakeholderForm.scss';
import {Stakeholder} from "../../../../models/stakeholder.models.ts";
import {useEffect, useState} from "react";
import {FaRegSave} from "react-icons/fa";

export interface StakeholderUpdateDTO {
    name: string;
    streetAddress: string;
    mailingAddress: string;
    phoneNumber: string;
    isPerson: string;  // Updated to boolean
    stakeholderComments: string;
    stakeholderStatus: string;
    contacted: string;  // Updated to boolean
    consultation: string;
    attempts: string;
    email: string;
    followUp: string;
}

const StakeholderForm: React.FC<{ stakeholder: Stakeholder }> = ({stakeholder}) => {
    const [formData, setFormData] = useState<StakeholderUpdateDTO>(stakeholder);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect((): void => {
        // Update form data when stakeholder prop changes
        setFormData({
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
    }, [stakeholder]);

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Details</label>
            </div>
            <div className="panel-content">

                <div className="form-row">
                    <div className="input-wrapper">
                        <label>
                            Name:
                            <textarea name="name" value={formData.name} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className="input-wrapper">
                        <label>
                            Stakeholder Comments:
                            <textarea name="stakeholderComments" value={formData.stakeholderComments}
                                      onChange={handleChange}/>
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-wrapper">
                        <label>
                            Mailing Address:
                            <textarea name="mailingAddress" value={formData.mailingAddress}
                                      onChange={handleChange}/>
                        </label>
                    </div>
                    <div className="input-wrapper">
                        <label>
                            Street Address:
                            <textarea name="streetAddress" value={formData.streetAddress} onChange={handleChange}/>
                        </label>
                    </div>
                </div>


                <div className="form-row">
                    <div className="input-wrapper">
                        <label>
                            Email:
                            <textarea name="email" value={formData.email} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className="input-wrapper">
                        <label>
                            Phone Number:
                            <textarea name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-wrapper">
                        <label>
                            Stakeholder Status:
                            <input type="text" name="stakeholderStatus" value={formData.stakeholderStatus}
                                   onChange={handleChange}/>
                        </label>
                    </div>
                    <div className="input-wrapper">
                        <label>
                            Is Person:
                            <input type="text" name="isPerson" value={formData.isPerson} onChange={handleChange}/>
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-wrapper">
                        <label>
                            Consultation:
                            <input type="text" name="consultation" value={formData.consultation}
                                   onChange={handleChange}/>
                        </label>
                    </div>
                    <div className="input-wrapper">
                        <label>
                            Contacted:
                            <input type="text" name="contacted" value={formData.contacted} onChange={handleChange}/>
                        </label>
                    </div>
                </div>


                <div className="form-row">
                    <div className="input-wrapper">
                        <label>
                            Attempts:
                            <input type="text" name="attempts" value={formData.attempts} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className="input-wrapper">
                        <label>
                            Follow Up:
                            <input type="text" name="followUp" value={formData.followUp} onChange={handleChange}/>
                        </label>
                    </div>
                </div>

                <button type="submit"><FaRegSave/>Save</button>

            </div>
        </div>
    );
}

export default StakeholderForm;
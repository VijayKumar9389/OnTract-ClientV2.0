import React, {useEffect, useState} from "react";
import { UpdateTrackRecordInput} from "../../../../models/stakeholder.models.ts";
import {Stakeholder, TractRecord} from "../../../../models/stakeholder.models.ts";
import {updateTractRecord} from "../../../../services/stakeholder.services.ts";
import {useNavigate} from "react-router-dom";

interface TractFormProps {
    stakeholder: Stakeholder;
    tractRecord: TractRecord;
}

const TractForm: React.FC<TractFormProps> = ({ stakeholder, tractRecord }) => {
    const [formData, setFormData] = useState<UpdateTrackRecordInput>({
        structure: "",
        interest: "",
        occupants: 0,
        worksLand: "",
        tractComments: "",
    });

    const navigate = useNavigate();

    const selectStakeholder = (stakeholder: Stakeholder): void => {
        navigate(`/stakeholder/${stakeholder.id}`);
    };

    useEffect((): void => {
        setFormData({
            structure: tractRecord.structure,
            interest: tractRecord.interest,
            occupants: tractRecord.occupants,
            worksLand: tractRecord.worksLand,
            tractComments: tractRecord.tractComments,
        })
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const isAvailable = (value: string): boolean => (value !== "");

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        // Add your form submission logic here using formData
        updateTractRecord(tractRecord.id, formData).then((response) => {
            console.log(response);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="tract-form">
            <div className="card-header">
                <h3>{stakeholder.name}</h3>
            </div>
            <ul className="">
                {isAvailable(stakeholder.phoneNumber)
                    ? null
                    : <a className="chip red">No Phone No.</a>
                }
                {isAvailable(stakeholder.streetAddress)
                    ? null
                    : <a className="chip red">No Street Address</a>
                }
                {isAvailable(stakeholder.mailingAddress)
                    ? null
                    : <a className="chip red">No Mailing Address</a>
                }
            </ul>
            <div className="input-wrapper">
                <label>
                    Structure:
                    <input type="text" name="structure" value={formData.structure} onChange={handleChange}/>
                </label>
            </div>
            <div className="input-wrapper">
                <label>
                    Interest:
                    <input type="text" name="interest" value={formData.interest} onChange={handleChange}/>
                </label>
            </div>
            <div className="input-wrapper">
                <label>
                    Occupants:
                    <input type="number" name="occupants" value={formData.occupants} onChange={handleChange}/>
                </label>
            </div>
            <div className="input-wrapper">
                <label>
                    Works Land:
                    <input type="text" name="worksLand" value={formData.worksLand} onChange={handleChange}/>
                </label>
            </div>
            <div className="input-wrapper">
                <label>
                    Tract Comments:
                    <textarea
                        name="tractComments"
                        value={formData.tractComments}
                        onChange={handleChange}
                    ></textarea>
                </label>
            </div>
            <div className="action-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => selectStakeholder(stakeholder)}>View Stakeholder</button>
            </div>
        </form>
    );
}

export default TractForm;

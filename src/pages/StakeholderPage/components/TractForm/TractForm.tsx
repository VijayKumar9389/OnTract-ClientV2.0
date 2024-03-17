import React, {useEffect, useState} from "react";
import { UpdateTrackRecordInput} from "../../../../models/stakeholder.models.ts";
import {Stakeholder, TractRecord} from "../../../../models/stakeholder.models.ts";
import {updateTractRecord} from "../../../../services/stakeholder.services.ts";
import {useNavigate, useParams} from "react-router-dom";

const TractForm: React.FC<{stakeholder: Stakeholder, tractRecord: TractRecord}> = ({ stakeholder, tractRecord }) => {
    const [formData, setFormData] = useState<UpdateTrackRecordInput>({
        structure: "",
        interest: "",
        occupants: 0,
        worksLand: "",
        tractComments: "",
    });

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const selectStakeholder = (stakeholder: Stakeholder): void => {
        navigate(`/stakeholder/${stakeholder.id}`);
    };

    useEffect((): void => {
        setFormData({
            structure: tractRecord.structure,
            interest: tractRecord.interest,
            occupants: tractRecord.occupants,
            worksLand: tractRecord.worksLand === "YES" ? "YES" : "NO",
            tractComments: tractRecord.tractComments,
        })
    }, []);

    function isStakeholderIdDifferent(stakeholderId: string | number, idFromParams: string | undefined): boolean {
        if (typeof stakeholderId === 'number' && idFromParams) {
            return stakeholderId !== Number(idFromParams);
        } else if (typeof stakeholderId === 'string' && idFromParams) {
            return stakeholderId !== idFromParams;
        }
        return false; // Default to false if types are incompatible or idFromParams is undefined
    }


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
                {isStakeholderIdDifferent(stakeholder.id, id)
                    ? null
                    : <a className="chip green">Viewing Profile</a>}
            </ul>
            <div className="input-wrapper">
                <label>
                    Structure:
                </label>
                <input type="text" name="structure" value={formData.structure} onChange={handleChange}/>
            </div>
            <div className="input-wrapper">
                <label>
                    Interest:
                </label>
                <input type="text" name="interest" value={formData.interest} onChange={handleChange}/>
            </div>
            <div className="input-wrapper">
                <label>
                    Occupants:
                </label>
                <input type="number" name="occupants" value={formData.occupants} onChange={handleChange}/>
            </div>
            <div className="input-wrapper">
                <label>
                    Works Land:
                </label>
                <div>
                    <input
                        type="checkbox"
                        id="worksLand"
                        name="worksLand"
                        checked={formData.worksLand === 'YES'}
                        onChange={(e) => {
                            const newValue = e.target.checked ? 'YES' : 'NO';
                            setFormData((prevData) => ({
                                ...prevData,
                                worksLand: newValue,
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="input-wrapper">
                <label>
                    Tract Comments:
                </label>
                <textarea
                    name="tractComments"
                    value={formData.tractComments}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="action-buttons">
                <button type="submit">Submit</button>
                {isStakeholderIdDifferent(stakeholder.id, id) ?
                    <button type="button" onClick={() => selectStakeholder(stakeholder)} >View Stakeholder</button> : null}

            </div>
        </form>
    );


}

export default TractForm;

import React, {useEffect, useState} from "react";
import {UpdateTrackRecordInput} from "../../../../models/stakeholder.models.ts";
import {Stakeholder, TractRecord} from "../../../../models/stakeholder.models.ts";
import {updateTractRecord} from "../../../../services/stakeholder.services.ts";
import {useNavigate, useParams} from "react-router-dom";
import {isStakeholderProfile} from "../../../../utils/helpers.ts";

const TractForm: React.FC<{ stakeholder: Stakeholder; tractRecord: TractRecord }> = ({stakeholder, tractRecord}) => {
    const [formData, setFormData] = useState<UpdateTrackRecordInput>({
        structure: tractRecord.structure,
        interest: tractRecord.interest,
        occupants: tractRecord.occupants,
        worksLand: tractRecord.worksLand === "YES" ? "YES" : "NO",
        tractComments: tractRecord.tractComments,
    });

    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect((): void => {
        setFormData((prevData) => ({
            ...prevData,
            structure: tractRecord.structure,
            interest: tractRecord.interest,
            occupants: tractRecord.occupants,
            worksLand: tractRecord.worksLand === "YES" ? "YES" : "NO",
            tractComments: tractRecord.tractComments,
        }));
    }, [tractRecord]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        updateTractRecord(tractRecord.id, formData).then((response) => {
            console.log(response);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="tract-form">
            <div className="card-header">
                <h3>{stakeholder.name}</h3>
                <ul>
                    {!isStakeholderProfile(stakeholder.id, id) && <a className="chip green">Viewing Profile</a>}
                    {!stakeholder.phoneNumber && <a className="chip red">No Phone No.</a>}
                    {!stakeholder.streetAddress && <a className="chip red">No Street Address</a>}
                    {!stakeholder.mailingAddress && <a className="chip red">No Mailing Address</a>}
                </ul>
            </div>

            <>
                <div className="input-wrapper">
                    <label>Structure:</label>
                    <input type="text" name="structure" value={formData.structure} onChange={handleChange}/>
                </div>
                <div className="input-wrapper">
                    <label>Interest:</label>
                    <input type="text" name="interest" value={formData.interest} onChange={handleChange}/>
                </div>
                <div className="input-wrapper">
                    <label>Occupants:</label>
                    <input type="number" name="occupants" value={formData.occupants} onChange={handleChange}/>
                </div>
                <div className="input-wrapper">
                    <label>Works Land:</label>
                    <input
                        type="checkbox"
                        id="worksLand"
                        name="worksLand"
                        checked={formData.worksLand === 'YES'}
                        onChange={(e) => {
                            const newValue = e.target.checked ? 'YES' : 'NO';
                            setFormData((prevData) => ({...prevData, worksLand: newValue}));
                        }}
                    />
                </div>
                <div className="input-wrapper">
                    <label>Tract Comments:</label>
                    <textarea name="tractComments" value={formData.tractComments} onChange={handleChange}></textarea>
                </div>
            </>

            <div className="action-buttons">
                <button type="submit">Submit</button>
                {isStakeholderProfile(stakeholder.id, id) && (
                    <button type="button" className="form-btn"
                            onClick={() => navigate(`/stakeholder/${stakeholder.id}`)}>
                        View Stakeholder
                    </button>
                )}
            </div>
        </form>
    );
};

export default TractForm;

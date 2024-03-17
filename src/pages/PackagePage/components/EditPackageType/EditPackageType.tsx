import './EditPackageType.scss';
import {PackageType} from "../../../../models/package.models.ts";
import React, {useEffect, useState} from "react";

const EditPackageType: React.FC<{ packageType: PackageType }> = ({packageType}) => {
    const [name, setName] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    useEffect(() => {
        if (packageType) {
            setName(packageType.name);
            setNotes(packageType.notes);
        }
    }, [packageType]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(event.target.value);
    };

    const handleEditPackage = () => {
        // You can perform your update logic here
        window.alert(`Name: ${name}\nNotes: ${notes}`);
    };

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Package Details</label>
            </div>
            <div className="panel-content">
                <form className="package-notes-form">
                    <div className="input-wrapper">
                        <label className="notes-label">Name:
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className="notes-textarea"
                            />
                        </label>
                    </div>

                    <div className="input-wrapper">
                        <label className="notes-label">Notes:
                            <textarea
                                value={notes}
                                onChange={handleNotesChange}
                                className="notes-textarea"
                            />
                        </label>
                    </div>

                    <button type="button" className="edit-notes-button" onClick={handleEditPackage}>
                        Edit Package
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditPackageType;
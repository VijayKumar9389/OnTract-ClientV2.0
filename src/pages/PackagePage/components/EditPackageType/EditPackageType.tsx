import {PackageType, NewPackageTypeInput} from "../../../../models/package.models.ts";
import {updatePackageType} from "../../../../services/package.services.ts";
import React, {useEffect, useState} from "react";
import {FaSave} from "react-icons/fa";

const EditPackageType: React.FC<{ packageType: PackageType }> = ({packageType}) => {
    const [name, setName] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    useEffect((): void => {
        if (packageType) {
            setName(packageType.name);
            setNotes(packageType.notes);
        }
    }, [packageType]);

    const hasDataChanged = (): boolean => {
        return (
            name !== packageType.name ||
            notes !== packageType.notes
        );
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setNotes(event.target.value);
    };

    const handleEditPackage = (): void => {
        const packageData: NewPackageTypeInput = {
            name: name,
            notes: notes,
        };
        updatePackageType(packageType.id, packageData)
            .then((response) => {
                // Handle success response if needed
                console.log("PackageTypeGrid updated successfully:", response);
                window.location.reload();
            })
            .catch((error): void => {
                // Handle error if needed
                console.error("Error updating package:", error);
            });
    };

    return (
        <div className="form-wrapper">
            <form className="package-notes-form">
                <div className="input-wrapper">
                    <label className="notes-label">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="notes-textarea"
                    />
                </div>
                <div className="input-wrapper">
                    <label className="notes-label">Notes:</label>
                    <textarea
                        value={notes}
                        onChange={handleNotesChange}
                        className="notes-textarea"
                    />
                </div>
                <button type="button" className="form-btn" disabled={!hasDataChanged()} onClick={handleEditPackage}>
                    <FaSave/>
                    Save
                </button>
            </form>
        </div>
    );
}

export default EditPackageType;
import {PackageType, NewPackageTypeInput} from "../../../../models/package.models.ts";
import {updatePackageType} from "../../../../services/package.services.ts";
import React, {useEffect, useState} from "react";

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
                console.log("Package updated successfully:", response);
                window.location.reload();
            })
            .catch((error) => {
                // Handle error if needed
                console.error("Error updating package:", error);
            });
    };

    return (
        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Package Details</label>
            </div>
            <div className="panel-content">
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
                        Edit Package
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditPackageType;
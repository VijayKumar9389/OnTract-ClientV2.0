import {PackageType} from "../../../../models/package.models.ts";
import {useEffect, useState} from "react";

const EditPackageNotes: React.FC<{packageType: PackageType}> = ({packageType}) => {

    useEffect((): void => {
        setNotes(packageType?.notes);
    }, [packageType]);

    const [notes, setNotes] = useState<string>('');

    const handleNotesSubmit = (): void => {
        window.alert(notes);
    }

    return (
        <form className="package-notes-form">
            <div className="input-wrapper">
                <label className="notes-label">Notes:
                    <textarea
                        defaultValue={packageType?.notes}
                        onChange={(event) => setNotes(event.target.value)}
                        className="notes-textarea"
                    />
                </label>
            </div>

            <button type="button" className="edit-notes-button" onClick={() => handleNotesSubmit()}>
                Edit Notes
            </button>
        </form>
    )
}

export default EditPackageNotes;
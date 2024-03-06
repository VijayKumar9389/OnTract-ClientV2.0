import './EditPackagePage.scss';
import {PackageType} from "../../../../models/package.models.ts";
import {useState, useEffect} from "react";
import {PackageItem} from "../../../../models/item.models.ts";

const EditPackageType: React.FC<{ packageType: PackageType }> = ({packageType}) => {
    const [notes, setNotes] = useState<string>('');

    const handleNotesSubmit = (): void => {
        window.alert(notes);
    }

    useEffect((): void => {
        setNotes(packageType?.notes);
    }, [packageType]);

    return (
        <div className="panel">

            <div className="panel-header">
                <label className="panel-label">Package Details</label>
            </div>

            <div className="panel-content">

                <form className="package-notes-form">
                     <textarea
                         defaultValue={packageType?.notes}
                         onChange={(event) => setNotes(event.target.value)}
                         className="notes-textarea"
                     />
                    <button type="button" className="edit-notes-button" onClick={() => handleNotesSubmit()}>
                        Edit Notes
                    </button>
                </form>

                <div className="package-list">
                    <div className="table-header">
                        <select className="item-select">
                            <option>Add Item</option>
                            {packageType.items.map((item: PackageItem) => (
                                <option key={item.id}>{item.item.name}</option>
                            ))}
                        </select>
                        <div className="action-buttons">
                            <button className="add-button">
                                Add Item
                            </button>
                        </div>
                    </div>
                    <ul>
                        {packageType.items.map((item: PackageItem) => (
                            <li key={item.id} className="table-row">
                                <div className="item-image-cell">
                                    <img
                                        src={`http://localhost:3005/images/${item.item.image}`}
                                        alt={`Image for ${item.item.name}`}
                                        className="item-image"
                                    />
                                </div>
                                <div className="item-details-cell">
                                    <h4>{item.item.name}</h4>
                                    <p>{item.item.description}</p>
                                </div>
                                <div className="action-buttons">
                                    <button>
                                        Remove Item
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default EditPackageType;
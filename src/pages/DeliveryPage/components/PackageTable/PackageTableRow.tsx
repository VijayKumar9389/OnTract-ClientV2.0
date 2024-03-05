import React from "react";
import {Package} from "../../../../models/package.models.ts";
import {cancelPackage} from "../../../../services/package.services.ts";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton.tsx";
import {useNavigate} from "react-router-dom";
import {Stakeholder} from "../../../../models/stakeholder.models.ts";

const PackageTableRow: React.FC<{ deliveryPackage: Package }> = ({deliveryPackage}) => {

    const navigate = useNavigate();

    const selectStakeholder = (stakeholder: Stakeholder): void => {
        navigate(`/stakeholder/${stakeholder.id}`);
    };

    return (
        <tr>
            <td>
                <span>{deliveryPackage.packageType.name}</span>
            </td>
            <td>
                <span className="stakeholder-name">{deliveryPackage.stakeholder.name}</span>
            </td>
            <td>
                <div className="action-buttons">
                    <button className="action-button view-package">View Package</button>
                    <button onClick={() => selectStakeholder(deliveryPackage.stakeholder)} className="action-button view-stakeholder">View Stakeholder</button>
                    <ConfirmationButton
                        onConfirm={() => cancelPackage(deliveryPackage.id, deliveryPackage.stakeholder.id)}
                        buttonText="Cancel Package"
                        confirmationMessage="Are you sure you want to cancel this package?"
                    />
                </div>
            </td>
        </tr>
    );
}

export default PackageTableRow;
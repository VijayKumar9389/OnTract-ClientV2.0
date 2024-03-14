import React from "react";
import {Package} from "../../../../models/package.models.ts";
import {cancelPackage} from "../../../../services/package.services.ts";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton.tsx";
import {Navigation} from "../../../../utils/navigation.ts";

const PackageTableRow: React.FC<{ deliveryPackage: Package }> = ({deliveryPackage}) => {
    const {navigateToStakeholder, navigateToPackage} = Navigation();

    const handleCancelPackage = async (packageId: number, stakeholderId: number): Promise<void> => {
        try {
            await cancelPackage(packageId, stakeholderId);
            window.location.reload();
        } catch (error) {
            console.error('Failed to cancel package:', error);
            // Optionally, you can provide feedback to the user about the error
        }
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
                    <button className="action-button view-package"
                            onClick={() => navigateToPackage(deliveryPackage.packageType.id)}>View Package
                    </button>
                    <button onClick={() => navigateToStakeholder(deliveryPackage.stakeholder.id)}
                            className="action-button view-stakeholder">View Stakeholder
                    </button>
                    <ConfirmationButton
                        onConfirm={() => handleCancelPackage(deliveryPackage.id, deliveryPackage.stakeholder.id)}
                        buttonText="Cancel Package"
                        confirmationMessage="Are you sure you want to cancel this package?"
                    />
                </div>
            </td>
        </tr>
    );
}

export default PackageTableRow;
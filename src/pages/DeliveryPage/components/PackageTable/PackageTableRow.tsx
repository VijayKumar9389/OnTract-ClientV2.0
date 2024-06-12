import React from "react";
import {Package} from "../../../../models/package.models.ts";
import {cancelPackage} from "../../../../services/package.services.ts";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton.tsx";
import {NavigationUtils} from "../../../../utils/navigation.utils.ts";
import Dialog from "../../../../components/Dialog/Dialog.tsx";
import {useState} from "react";
import {showToastError} from "../../../../utils/toast.utils.ts";
import ChangePackage from "../ChangePackage/ChangePackage.tsx";

const PackageTableRow: React.FC<{ deliveryPackage: Package }> = ({deliveryPackage}) => {
    const {navigateToStakeholder} = NavigationUtils();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const toggleDialog = (): void => {
        setIsDialogOpen(!isDialogOpen);
    };

    const handleCancelPackage = async (packageId: number, stakeholderId: number): Promise<void> => {
        try {
            await cancelPackage(packageId, stakeholderId);
            window.location.reload();
        } catch (error) {
            console.error('Failed to cancel package:', error);
            showToastError('Failed to cancel package');
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
                    <button onClick={() => toggleDialog()}>
                        Edit Package
                    </button>
                    <button onClick={() => navigateToStakeholder(deliveryPackage.stakeholder.id)}>
                        View Stakeholder
                    </button>
                    <ConfirmationButton
                        onConfirm={() => handleCancelPackage(deliveryPackage.id, deliveryPackage.stakeholder.id)}
                        buttonText="Cancel Package"
                        confirmationMessage="Are you sure you want to cancel this package?"
                    />
                </div>
            </td>
            <Dialog
                element={<ChangePackage packageType={deliveryPackage.packageType} packageId={deliveryPackage.id}/>}
                heading={"Edit Package Type"}
                isOpen={isDialogOpen}
                toggle={() => toggleDialog()}/>
        </tr>
    );
}

export default PackageTableRow;
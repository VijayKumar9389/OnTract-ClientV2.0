import Dialog from "../../../../components/Dialog/Dialog.tsx";
import EditUser from "../EditUser/EditUser.tsx";
import {User} from "../../../../models/auth.models.ts";
import {deleteUser} from "../../../../services/user.services.ts";
import {useState} from "react";
import ConfirmationButton from "../../../../components/ConfirmationButton/ConfirmationButton.tsx";

const UserTableRow = ({user}: { user: User }) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const toggleModal = (): void => {
        setIsOpened(!isOpened);
    }

    const removeUser = async (): Promise<void> => {
        try {
            await deleteUser(user.id);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    return (
        <>
            <Dialog
                isOpen={isOpened}
                toggle={toggleModal}
                heading="Edit User"
                element={<EditUser user={user}/>}/>
            <tr>
                <td>{user.username}</td>
                <td>{user.isAdmin ? "True" : "False"}</td>
                <td>
                    <div className="action-buttons">
                        <button onClick={() => toggleModal()}>Edit</button>
                        {!user.isAdmin && (
                            <ConfirmationButton
                                buttonText={"Remove User"}
                                confirmationMessage={`Are you sure you want to remove ${user.username} from the system?`}
                                onConfirm={() => removeUser()}
                            />
                        )}
                    </div>
                </td>
            </tr>
        </>
    );
}

export default UserTableRow;
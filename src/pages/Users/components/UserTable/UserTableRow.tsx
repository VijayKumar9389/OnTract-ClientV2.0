import Dialog from "../../../../components/Dialog/Dialog.tsx";
import EditUser from "../EditUser/EditUser.tsx";
import {User} from "../../../../models/auth.models.ts";
import {useState} from "react";

const UserTableRow = ({user}: { user: User }) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const toggleModal = (): void => {
        setIsOpened(!isOpened);
    }

    return (
        <>
            <Dialog
                isOpen={isOpened}
                toggle={toggleModal}
                heading="Edit User"
                element={<EditUser user={user}/>}/>
            <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.isAdmin ? "True" : "False"}</td>
                <td>
                    <div className="action-buttons">
                        <button onClick={() => toggleModal()}>Edit</button>
                        <button>Delete</button>
                    </div>
                </td>
            </tr>
        </>
    );
}

export default UserTableRow;
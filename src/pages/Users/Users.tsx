import Heading from "../../components/Heading/Heading.tsx";
import UserTable from "./components/UserTable/UserTable.tsx";
import { useState} from "react";
import Dialog from "../../components/Dialog/Dialog.tsx";
import RegisterUser from "./components/RegisterUser/RegisterUser.tsx";
import {MdAdd} from "react-icons/md";

const Users = () => {

    const [isOpened, setIsOpened] = useState(false);

    const toggleModal = () => {
        setIsOpened(!isOpened);
    }

    return (
        <div>
            <Heading heading="Users"/>
            <div className="page-content">
                <div className="panel">
                    <div className="panel-header">
                        <label className="panel-label">User List</label>
                    </div>
                    <div className="panel-content">
                        <div className="btn-container">
                            <button onClick={toggleModal} ><MdAdd /> Add User</button>
                        </div>
                        <Dialog isOpen={isOpened} toggle={toggleModal} heading="Add User" element={<RegisterUser />} />
                        <UserTable/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;

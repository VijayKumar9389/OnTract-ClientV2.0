import Heading from "../../components/Heading/Heading.tsx";
import UserTable from "./components/UserTable/UserTable.tsx";
import {useEffect, useState} from "react";
import Dialog from "../../components/Dialog/Dialog.tsx";
import RegisterUser from "./components/RegisterUser/RegisterUser.tsx";
import {MdAdd} from "react-icons/md";
import {User} from "../../models/auth.models.ts";
import {getUsers} from "../../services/user.services.ts";

const Users = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect((): void => {
        const fetchUsers = async (): Promise<void> => {
            try {
                const response: User[] = await getUsers();
                setUsers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
                // Handle error
            }
        };

        fetchUsers();
    }, []);

    const toggleModal = (): void => {
        setIsOpened(!isOpened);
    }

    return (
        <div className="section">
            <Heading heading="Users"/>
            <div className="page-content">
                <div className="header">
                    <h3>Users ({users.length})</h3>
                    <button onClick={toggleModal}><MdAdd/> Add User</button>
                </div>
                <div className="panel">
                    <div className="panel-content">
                        <Dialog isOpen={isOpened} toggle={toggleModal} heading="Add User" element={<RegisterUser/>}/>
                        <UserTable users={users}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;

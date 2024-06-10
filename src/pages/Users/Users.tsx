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

        fetchUsers()
            .then(() => console.log('Users fetched'));
    }, []);

    const toggleModal = (): void => {
        setIsOpened(!isOpened);
    }

    return (
        <div className="section">
            <div className="page-content">
                <div className="sub-header">
                    <button onClick={toggleModal}><MdAdd/> Add User</button>
                    <p>Results: <strong>{users.length}</strong></p>
                </div>
                <div className="panel">
                    <div className="panel-header">
                        <h3>Users</h3>
                    </div>
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

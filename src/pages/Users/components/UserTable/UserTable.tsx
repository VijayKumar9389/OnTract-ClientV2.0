import './UserTable.scss';
import {useEffect, useState} from "react";
import {User} from "../../../../models/auth.models.ts";
import {getUsers} from "../../../../services/user.services.ts";

const UserTable = () => {
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

    return (
        <table className="user-table">
            <thead>
            <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Admin Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user: User) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.isAdmin ? "True" : "False"}</td>
                    <td>
                        <div className="action-buttons">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default UserTable;
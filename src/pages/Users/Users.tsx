import {getUsers} from "../../services/user.services.ts";
import  { useEffect, useState } from "react";
import { User } from "../../models/auth.models";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
                // Handle error
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user: User) => (
                    <li key={user.id}>
                        <h1>{user.username}</h1>
                        <p>{user.isAdmin ? "true" : "false"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;

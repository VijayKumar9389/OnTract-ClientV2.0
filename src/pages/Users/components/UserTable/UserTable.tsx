import {User} from "../../../../models/auth.models.ts";
import UserTableRow from "./UserTableRow.tsx";

const UserTable: React.FC<{users: User[]}> = ({users}) => {

    return (
        <table className="user-table">
            <thead>
            <tr>
                <th>Username</th>
                <th>Admin Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user: User) => (
                <UserTableRow user={user} key={user.id}/>
            ))}
            </tbody>
        </table>
    );
}

export default UserTable;
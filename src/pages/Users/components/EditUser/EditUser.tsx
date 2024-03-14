import './EditUser.scss';
import React, {useState, useEffect} from "react";
import {User} from "../../../../models/auth.models.ts";
import {editUser} from "../../../../services/user.services.ts";

const EditUser: React.FC<{user: User}> = ({user}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect((): void => {
        setUsername(user.username);
    }, [user]);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            await editUser(user.id, username, password);
            alert('User registered successfully');
            window.location.reload();
        } catch (error) {
            alert('Failed to register user');
        }
    }

    return (
        <div className="register-user">
            <form onSubmit={handleRegister}>
                <div className="input-wrapper">
                    <label htmlFor="username">Enter New Username:
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Enter New Password:
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>


                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default EditUser;
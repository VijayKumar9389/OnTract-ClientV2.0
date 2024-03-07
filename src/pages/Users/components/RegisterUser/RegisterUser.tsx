import './RegisterUser.scss';
import React, { useState } from "react";
import {registerUser} from "../../../../services/user.services.ts";

const RegisterUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            await registerUser(username, password);
            alert('User registered successfully');
        } catch (error) {
            alert('Failed to register user');
        }
    }

    return (
        <div className="register-user">
            <h1>Register User</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterUser;

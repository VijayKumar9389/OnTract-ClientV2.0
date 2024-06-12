import React, {useState} from "react";
import {registerUser} from "../../../../services/user.services.ts";
import {FaUser} from "react-icons/fa";
import {showToastError} from "../../../../utils/toast.utils.ts";

const RegisterUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            await registerUser(username, password);
            console.log('User registered successfully');
            window.location.reload();
        } catch (error) {
            console.log('Failed to register user', error);
            showToastError('Failed to register user');
        }
    }

    const isFormValid = (): boolean => {
        return username !== '' && password !== '';
    }

    return (
        <div className="register-user">
            <form onSubmit={handleRegister}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="form-btn" disabled={!isFormValid()}>
                    <FaUser />
                    Add User
                </button>
            </form>
        </div>
    );
}

export default RegisterUser;

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
                    <label htmlFor="username">Username:
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password:
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
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

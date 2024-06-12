import React, {useState, useEffect} from "react";
import {User} from "../../../../models/auth.models.ts";
import {editUser} from "../../../../services/user.services.ts";
import {showToastError} from "../../../../utils/toast.utils.ts";
import {FaSave} from "react-icons/fa";

const EditUser: React.FC<{user: User}> = ({user}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect((): void => {
        setUsername(user.username);
    }, [user]);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            await editUser(user.id, username, password);
            alert('User registered successfully');
            window.location.reload();
        } catch (error) {
            alert('Failed to register user');
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
                    <label htmlFor="username">Enter New Username:</label>
                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Enter New Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="form-btn" disabled={!isFormValid()}>
                    <FaSave />
                    Save
                </button>
            </form>
        </div>
    );
}

export default EditUser;
import React, { useState } from 'react';
import { handleLogin } from '../../services/user.services.ts';
import './Login.scss';
import {useDispatch} from "react-redux";
import {AiFillSafetyCertificate} from "react-icons/ai";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const onLoginClick = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        await handleLogin(username, password, dispatch);
    };

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-title">
                    <h1>OnTract</h1>
                    <AiFillSafetyCertificate />
                </div>
                <div className="login-content">
                    <h3>Please sign in</h3>
                    <form onSubmit={onLoginClick} className="login-form">
                        <div className="input-wrapper">
                            <label htmlFor="username" className="login-label">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="login-input"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password" className="login-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className="login-btn">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

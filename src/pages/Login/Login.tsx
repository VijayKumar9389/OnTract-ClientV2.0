import './Login.scss';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {MdEmergencyShare} from "react-icons/md";
import {handleLogin} from "../../services/user.services.ts";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onLoginClick = async (): Promise<void> => {
        event.preventDefault();
        await handleLogin(username, password, dispatch);
    };

    return (
        <div className="login-container">
            <h1 className="login-title"><MdEmergencyShare /> OnTract</h1>
            <form onSubmit={onLoginClick} className="login-form">
                <h2>Login</h2>
                <div className="login-input-group">
                    <label htmlFor="username" className="login-label">Username</label>
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
                <div className="login-input-group">
                    <label htmlFor="password" className="login-label">Password</label>
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
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
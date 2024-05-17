import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyRefreshToken } from './services/auth.services';
import { RootState } from './store';
import { checkAdminStatus } from './services/user.services';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import './styles/app.scss';
import RoutesConfig from "./routes/routes";
import {activateInterceptor} from "./utils/interceptors";
import {getProjectFromCookie} from "./utils/cookieHelper";
import ProjectTable from "./components/ProjectTable/ProjectTable";
import {Project} from "./models/stakeholder.models";

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.loggedIn);
    const project: Project | null = getProjectFromCookie();
    const dispatch = useDispatch();

    useEffect((): void => {
        activateInterceptor(dispatch);
        verifyRefreshToken(dispatch)
            .then(() => checkAdminStatus(dispatch))
            .catch(error => {
                // Handle error
                console.error('Error verifying refresh token:', error);
            })
            .finally(() => setLoading(false));
    }, [isLoggedIn, dispatch]);

    if (loading) return <div>Loading...</div>; // Add loading state

    if (!isLoggedIn) return <Login />;
    if (!project) return <ProjectTable toggleMenu={() => {}} />;

    return (
        <div className="app-container">
            <Navbar />
            <div className="content">
                <ToastContainer />
                <RoutesConfig />
            </div>
        </div>
    );
};

export default App;
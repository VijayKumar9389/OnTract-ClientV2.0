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
    const isAdmin: boolean = useSelector((state: RootState) => state.auth.isAdmin);
    const project: Project | null = getProjectFromCookie();
    const dispatch = useDispatch();

    useEffect((): void => {
        const initializeApp = async (): Promise<void> => {
            try {
                activateInterceptor(dispatch);
                await verifyRefreshToken(dispatch);
                await checkAdminStatus(dispatch);
            } catch (error) {
                console.error('Error during initialization:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeApp()
            .then(() => console.log('App initialized'));
    }, [dispatch, isAdmin]);

    if (loading) return <div>Loading...</div>;
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
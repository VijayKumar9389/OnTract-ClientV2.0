import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyRefreshToken } from './services/auth.services';
import { RootState } from './store';
import { checkAdminStatus } from './services/user.services.ts';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import './styles/app.scss';
import RoutesConfig from "./routes/routes.tsx";
import {activateInterceptor} from "./utils/interceptors.ts";
import {getProjectFromCookie} from "./utils/cookieHelper.ts";
import ProjectTable from "./components/ProjectTable/ProjectTable.tsx";



const App: React.FC = () => {
    const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.loggedIn);
    const project = getProjectFromCookie();
    const dispatch = useDispatch();

    useEffect((): void => {
        activateInterceptor(dispatch);
        verifyRefreshToken(dispatch).then((): void => {
            checkAdminStatus(dispatch).then((): void => {});
        });
    }, []);

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


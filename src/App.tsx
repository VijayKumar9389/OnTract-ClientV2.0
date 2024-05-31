import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAdminStatus, verifyRefreshToken } from './services/auth.services';
import { RootState } from './store';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import './styles/app.scss';
import RoutesConfig from "./routes/routes";
import { activateInterceptor } from "./utils/interceptors";
import { getProjectFromCookie } from "./utils/cookieHelper";
import ProjectTable from "./components/ProjectTable/ProjectTable";
import { setAdminStatus, setLogin, setLogout } from "./store/reducers/auth.reducer.ts";

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    const project = getProjectFromCookie();
    const dispatch = useDispatch();

    useEffect((): void => {
        const initializeApp = async (): Promise<void> => {
            try {
                activateInterceptor(dispatch);
                const status: {auth: boolean, user: string} = await verifyRefreshToken();
                dispatch(setLogin(status));
                const adminStatus: boolean = await checkAdminStatus();
                dispatch(setAdminStatus(adminStatus));
            } catch (error) {
                console.error('Error during initialization:', error);
                dispatch(setLogout());
            } finally {
                setLoading(false);
            }
        };

        initializeApp()
            .then(() => console.log('App initialized'));
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (!isLoggedIn) return <Login />;
    if (!project) return <ProjectTable toggleMenu={(): void => {}} />;

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

import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { useInitializeApp } from './hooks/useInitializeApp'; // Import the custom hook
import { getProjectFromCookie } from './utils/cookieHelper';
import { RootState } from './store';

import Navbar from './components/Navbar/Navbar';
import ProjectTable from './components/ProjectTable/ProjectTable';
import Login from './pages/Login/Login';

import RoutesConfig from './routes/routes';

import './styles/app.scss';
import {Project} from "./models/stakeholder.models.ts";

const App: React.FC = () => {
    const loading: boolean = useInitializeApp(); // Use the custom hook
    const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.loggedIn);
    const project: Project | null = getProjectFromCookie();

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

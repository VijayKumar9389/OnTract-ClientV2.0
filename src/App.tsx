import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Stakeholders from "./pages/Stakeholders/Stakeholders";
import Deliveries from "./pages/Deliveries/Deliveries";
import Inventory from "./pages/Inventory/Inventory";
import StakeholderPage from "./pages/StakeholderPage/StakeholderPage";
import DeliveryPage from "./pages/DeliveryPage/DeliveryPage";
import PackagePage from "./pages/PackagePage/PackagePage";
import ItemPage from "./pages/ItemPage/ItemPage";
import Packages from "./pages/Packages/Packages";
import Users from "./pages/Users/Users.tsx";
import { RootState } from "./store";
import { activateInterceptor, verifyRefreshToken } from "./services/auth.services";
import './styles/app.scss';
import Projects from "./pages/Projects/Projects.tsx";
import {checkAdminStatus} from "./services/user.services.ts";

const App = () => {
    const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.loggedIn);
    const isAdmin: boolean = useSelector((state: RootState) => state.auth.isAdmin);
    const dispatch = useDispatch();

    useEffect(() => {
        activateInterceptor(dispatch);
        verifyRefreshToken(dispatch).then(() => {
            console.log("Refresh token verified");
            // After verifying the refresh token, check admin status
            checkAdminStatus(dispatch);
        });
    }, []);

    if (!isLoggedIn) return <Login />;

    return (
        <div className="app-container">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/stakeholders" element={<Stakeholders />} />
                    <Route path="/stakeholder/:id" element={<StakeholderPage />} />
                    <Route path="/deliveries" element={<Deliveries />} />
                    <Route path="/deliveries/:id" element={<DeliveryPage />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/inventory/:id" element={<ItemPage />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/packages/:id" element={<PackagePage />} />
                    {isAdmin && (
                        <>
                            <Route path="/users" element={<Users />} />
                            <Route path="/projects" element={<Projects />} />
                        </>
                    )}
                </Routes>
            </div>
        </div>
    );
}

export default App;

import './styles/app.scss';
import './styles/theme.scss';
import Login from "./pages/Login/Login.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import Stakeholders from "./pages/Stakeholders/Stakeholders.tsx";
import Deliveries from "./pages/Deliveries/Deliveries.tsx";
import Inventory from "./pages/Inventory/Inventory.tsx";
import StakeholderPage from "./pages/StakeholderPage/StakeholderPage.tsx";
import DeliveryPage from "./pages/DeliveryPage/DeliveryPage.tsx";
import {useEffect} from "react";
import {activateInterceptor, verifyRefreshToken} from "./services/auth.services.ts";
import {useDispatch} from "react-redux";
import Navbar from "./components/Navbar/Navbar.tsx";
import {Route, Routes} from "react-router-dom";

const App = () => {
    const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.loggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        activateInterceptor(dispatch);
        console.log(verifyRefreshToken(dispatch).then(
            // (response) => console.log(response)
        ));
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

                </Routes>
            </div>
        </div>
    );

}

export default App

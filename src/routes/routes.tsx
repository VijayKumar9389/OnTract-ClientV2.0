// routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import Stakeholders from "../pages/Stakeholders/Stakeholders.tsx";
import StakeholderPage from "../pages/StakeholderPage/StakeholderPage.tsx";
import Deliveries from "../pages/Deliveries/Deliveries.tsx";
import DeliveryPage from "../pages/DeliveryPage/DeliveryPage.tsx";
import Inventory from "../pages/Inventory/Inventory.tsx";
import ItemPage from "../pages/ItemPage/ItemPage.tsx";
import Packages from "../pages/Packages/Packages.tsx";
import PackagePage from "../pages/PackagePage/PackagePage.tsx";
import Users from "../pages/Users/Users.tsx";
import Projects from "../pages/Projects/Projects.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";

const RoutesConfig: React.FC = () => {
    const isAdmin: boolean = useSelector((state: RootState) => state.auth.isAdmin);

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stakeholders" element={<Stakeholders />} />
            <Route path="/stakeholders/:id" element={<StakeholderPage />} />
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
    );
};

export default RoutesConfig;

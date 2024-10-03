import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../store/reducers/auth.reducer";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaTruck, FaBoxes, FaUser, FaSignOutAlt, FaUsers, FaProjectDiagram } from 'react-icons/fa';
import { FiPackage } from "react-icons/fi";
import Sidebar from "../Sidebar/Sidebar";
import { RootState } from "../../store";
import "./Navbar.scss";
import {AiFillSafetyCertificate} from "react-icons/ai";

interface NavbarLink {
    to: string;
    text: string;
    icon: JSX.Element;
}

const Navbar = () => {
    const dispatch = useDispatch();
    const isAdmin: boolean = useSelector((state: RootState) => state.auth.isAdmin);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeModal = () => setIsSidebarOpen(false);
    const handleLogout = () => dispatch(setLogout());

    const navbarLinks: NavbarLink[] = [
        { to: "/", text: "Dashboard", icon: <FaHome /> },
        { to: "/stakeholders", text: "Stakeholders", icon: <FaUser /> },
        { to: "/deliveries", text: "Deliveries", icon: <FaTruck /> },
        { to: "/packages", text: "Packages", icon: <FiPackage /> },
        { to: "/inventory", text: "Inventory", icon: <FaBoxes /> },
    ];

    const adminLinks: NavbarLink[] = [
        { to: "/users", text: "Users", icon: <FaUsers /> },
        { to: "/projects", text: "Projects", icon: <FaProjectDiagram /> },
    ];

    // Function to determine if a link is active
    const isActiveLink = (linkTo: string): boolean => {
        if (linkTo === "/") {
            return location.pathname === linkTo;
        }
        return location.pathname.startsWith(linkTo);
    };

    return (
        <>
            <nav className="nav-container">
                <div className="nav-logo">
                    <AiFillSafetyCertificate />
                    <h1>OnTract</h1>
                </div>
                <ul className="navbar-links">
                    {navbarLinks.map((link: NavbarLink, index: number) => (
                        <li key={index}>
                            <Link
                                to={link.to}
                                className={`navbar-link ${isActiveLink(link.to) ? 'active' : ''}`}
                                onClick={closeModal}
                            >
                                {link.icon}
                                {link.text}
                            </Link>
                        </li>
                    ))}
                    {isAdmin && adminLinks.map((link: NavbarLink, index: number) => (
                        <li key={index}>
                            <Link
                                to={link.to}
                                className={`navbar-link ${isActiveLink(link.to) ? 'active' : ''}`}
                                onClick={closeModal}
                            >
                                {link.icon}
                                {link.text}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button className="btn-logout" onClick={handleLogout}>
                            <FaSignOutAlt/> Logout
                        </button>
                    </li>
                </ul>

                <button className="btn-menu" onClick={toggleSidebar}>
                    <GiHamburgerMenu/>
                </button>
            </nav>
            <Sidebar
                isOpen={isSidebarOpen}
                toggle={toggleSidebar}
                navbarLinks={navbarLinks}
                adminLinks={adminLinks}
                isAdmin={isAdmin}
                closeModal={closeModal}
                handleLogout={handleLogout}
            />
        </>
    );
}

export default Navbar;

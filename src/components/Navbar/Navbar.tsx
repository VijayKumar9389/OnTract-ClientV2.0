import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../store/reducers/auth.reducer";
import { MdEmergencyShare } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaTruck, FaBoxes, FaUser, FaSignOutAlt, FaUsers, FaProjectDiagram } from 'react-icons/fa';
import { FiPackage } from "react-icons/fi";
import Dialog from "../Dialog/Dialog";
import { RootState } from "../../store";
import "./Navbar.scss";

interface NavbarLink {
    to: string;
    text: string;
    icon: JSX.Element;
}

const Navbar = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(false);
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
    const isActiveLink = (linkTo: string) => {
        if (linkTo === "/") {
            return location.pathname === linkTo;
        }
        return location.pathname.startsWith(linkTo);
    };

    return (
        <nav className="nav-container">
            <h1><MdEmergencyShare /> OnTract</h1>
            <ul className="navbar-links">
                {navbarLinks.map((link, index) => (
                    <li key={index}>
                        <Link
                            to={link.to}
                            className={`sidebar-link ${isActiveLink(link.to) ? 'active' : ''}`}
                            onClick={closeModal}
                        >
                            {link.icon}
                            {link.text}
                        </Link>
                    </li>
                ))}
                {isAdmin && adminLinks.map((link, index) => (
                    <li key={index}>
                        <Link
                            to={link.to}
                            className={`sidebar-link ${isActiveLink(link.to) ? 'active' : ''}`}
                            onClick={closeModal}
                        >
                            {link.icon}
                            {link.text}
                        </Link>
                    </li>
                ))}
                <li>
                    <button className="btn-logout" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
            </ul>

            <button className="btn-menu" onClick={toggleModal}>
                <GiHamburgerMenu />
            </button>

            <Dialog
                isOpen={isModalOpen}
                toggle={toggleModal}
                heading="Select Page"
                element={
                    <ul className="popup-links">
                        {navbarLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link.to} onClick={closeModal}>{link.text}</Link>
                            </li>
                        ))}
                        {isAdmin && adminLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link.to} onClick={closeModal}>{link.text}</Link>
                            </li>
                        ))}
                        <li>
                            <button className="btn-logout" onClick={handleLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </ul>
                }
            />
        </nav>
    );
}

export default Navbar;

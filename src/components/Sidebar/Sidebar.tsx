import './Sidebar.scss';
import {Link} from "react-router-dom";
import {FaSignOutAlt} from "react-icons/fa";
import {MdClose} from "react-icons/md";

interface NavbarLink {
    to: string;
    text: string;
    icon: JSX.Element;
}

interface SidebarProps {
    isOpen: boolean;
    toggle: () => void;
    navbarLinks: NavbarLink[];
    adminLinks: NavbarLink[];
    isAdmin: boolean;
    closeModal: () => void;
    handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             isOpen,
                                             toggle,
                                             navbarLinks,
                                             adminLinks,
                                             isAdmin,
                                             closeModal,
                                             handleLogout
                                         }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <button className="close-btn" onClick={toggle}><MdClose/></button>
            </div>
            <div className="sidebar-content">
                <ul className="sidebar-links">
                    {navbarLinks.map((link: NavbarLink, index: number) => (
                        <li key={index} className="sidebar-link-item">
                            <Link to={link.to} onClick={closeModal} className="sidebar-link">
                                {link.icon}
                                {link.text}
                            </Link>
                        </li>
                    ))}
                    {isAdmin && adminLinks.map((link: NavbarLink, index: number) => (
                        <li key={index} className="sidebar-link-item">
                            <Link to={link.to} onClick={closeModal} className="sidebar-link">
                                {link.icon}
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="sidebar-logout-container">
                    <button className="sidebar-logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt/>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

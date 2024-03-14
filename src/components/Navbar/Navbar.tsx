import {useState} from "react";
import {Link} from "react-router-dom";
import {FaHome, FaTruck, FaBoxes, FaUser, FaSignOutAlt, FaUsers, FaProjectDiagram, FaTimes} from 'react-icons/fa';
import {FiPackage} from "react-icons/fi";
import {GiHamburgerMenu} from "react-icons/gi";
import {MdEmergencyShare} from "react-icons/md";
import {setLogout} from "../../store/reducers/auth.reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import "./Navbar.scss";

const Navbar = () => {
    const dispatch = useDispatch();
    const isAdmin: boolean = useSelector((state: RootState) => state.auth.isAdmin);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <nav className="nav-container">
            <h1><MdEmergencyShare/> OnTract</h1>
            <ul className="navbar-links">
                <li><Link to="/" className="sidebar-link" onClick={closeModal}><FaHome/>Dashboard</Link></li>
                <li><Link to="/stakeholders" className="sidebar-link" onClick={closeModal}><FaUser/>Stakeholders</Link>
                </li>
                <li><Link to="/deliveries" className="sidebar-link" onClick={closeModal}><FaTruck/>Deliveries</Link>
                </li>
                <li><Link to="/inventory" className="sidebar-link" onClick={closeModal}><FaBoxes/>Inventory</Link></li>
                <li><Link to="/packages" className="sidebar-link" onClick={closeModal}><FiPackage/>Packages</Link></li>
                {isAdmin && (
                    <>
                        <li><Link to="/users" className="sidebar-link" onClick={closeModal}><FaUsers/>Users</Link></li>
                        <li><Link to="/projects" className="sidebar-link" onClick={closeModal}><FaProjectDiagram/>Projects</Link>
                        </li>
                    </>
                )}
                <li>
                    <button className="btn-logout" onClick={() => dispatch(setLogout())}><FaSignOutAlt/>Logout</button>
                </li>
            </ul>
            <button className="btn-menu" onClick={toggleModal}>
                <GiHamburgerMenu/>
            </button>

            {isModalOpen && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="btn-menu" onClick={toggleModal}>
                            <FaTimes/>
                        </button>

                        <ul className="modal-links">
                            <li><Link to="/" onClick={closeModal}>Dashboard</Link></li>
                            <li><Link to="/stakeholders" onClick={closeModal}>Stakeholders</Link></li>
                            <li><Link to="/deliveries" onClick={closeModal}>Deliveries</Link></li>
                            <li><Link to="/inventory" onClick={closeModal}>Inventory</Link></li>
                            <li><Link to="/packages" onClick={closeModal}>Packages</Link></li>
                            {isAdmin && (
                                <>
                                    <li><Link to="/users" onClick={closeModal}>Users</Link></li>
                                    <li><Link to="/projects" onClick={closeModal}>Projects</Link></li>
                                </>
                            )}
                        </ul>
                        <button className="btn-logout" onClick={() => dispatch(setLogout())}>Logout</button>
                    </div>
                </div>
            )}

        </nav>
    );
}

export default Navbar;

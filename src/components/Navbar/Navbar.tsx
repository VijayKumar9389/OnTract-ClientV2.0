import './Navbar.scss';
import { Link } from "react-router-dom";
import { FaHome, FaTruck, FaBoxes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FiPackage } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdEmergencyShare } from "react-icons/md";
import {setLogout} from "../../store/reducers/auth.reducer.ts";
import {useDispatch} from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <nav className="nav-container">
            <h1><MdEmergencyShare /> OnTract</h1>
            <ul>
                <Link to="/" className="sidebar-link"><FaHome/>Dashboard</Link>
                <Link to="/stakeholders" className="sidebar-link"><FaUser/>Stakeholders</Link>
                <Link to="/deliveries" className="sidebar-link"><FaTruck/>Deliveries</Link>
                <Link to="/inventory" className="sidebar-link"><FaBoxes/>Inventory</Link>
                <Link to="/packages" className="sidebar-link"><FiPackage/>Packages</Link>

                <button onClick={() => dispatch(setLogout())}>
                    <FaSignOutAlt/>Logout
                </button>
            </ul>
            <button className="btn-menu">
                <GiHamburgerMenu/>
            </button>
        </nav>
    );
}

export default Navbar;

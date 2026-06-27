// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f3f4f6" }}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/scan">Scan</Link>
            <Link to="/community">Community</Link>
            <Link to="/admin">Admin</Link>
        </nav>
    );
};

export default Navbar;
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Placeholder imports for team members to replace later
const Landing = () => <div>Landing Page</div>;
const Login = () => <div>Login Page</div>;
const Register = () => <div>Register Page</div>;
const Dashboard = () => <div>Dashboard</div>;
const Scan = () => <div>Scan Page</div>;
const Community = () => <div>Community Page</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;

function App() {
    return (
        <Router>
            {/* Navbar will render on every page */}
            <Navbar />

            <main className="container">
                <Routes>
                    {/* Auth Module */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Core Scan Module */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/scan" element={<Scan />} />

                    {/* Community Module */}
                    <Route path="/community" element={<Community />} />

                    {/* Admin Module */}
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
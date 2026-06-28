import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

// Import pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Scan from "./pages/Scan";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                    <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

                    {/* Protected Routes with Sidebar Layout */}
                    <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/scan" element={<Scan />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/profile" element={<Profile />} />
                        
                        {/* Admin Routes */}
                        <Route 
                            path="/admin/*" 
                            element={
                                <ProtectedRoute requireAdmin={true}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } 
                        />
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
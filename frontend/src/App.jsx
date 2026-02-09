import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';

// --- 1. Import Your Pages (Based on your Screenshot) ---
import Home from './pages/home';
import Login from './pages/login';
import Apply from './pages/apply';
import Waitlist from './pages/waitlist';
import NoPage from './pages/noPage';

// Trainee Pages
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import ModuleList from './pages/moduleList';
import ModuleDetail from './pages/moduleDetail';
import Submission from './pages/submission';
import Announcements from './pages/announcements';

// Admin Pages
import Users from './pages/users';
import Marking from './pages/marking';
import Register from './pages/register'; // For registering staff

// Layouts
import Navbar from './components/navbar'; // Assuming you have this
import Footer from './components/footer';

// --- 2. Security Wrapper (The Gatekeeper) ---
// This component checks if the user is allowed in.
// For now, we just check if a 'user' exists in localStorage.
const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user')); // We saved this during login
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Simple Role Check (Optional)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
     // If a trainee tries to access admin pages, kick them to dashboard
     return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />; // This renders the child route (e.g. Dashboard)
};

// --- 3. The Main App Structure ---
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES (Anyone can see) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/waitlist" element={<Waitlist />} />

        {/* PROTECTED: TRAINEE ZONE */}
        <Route element={<ProtectedRoute allowedRoles={['trainee', 'facilitator', 'admin']} />}>
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/app/profile" element={<Profile />} />
          <Route path="/app/modules" element={<ModuleList />} />
          <Route path="/app/modules/:moduleId" element={<ModuleDetail />} />
          <Route path="/app/modules/:moduleId/submit" element={<Submission />} />
          <Route path="/app/announcements" element={<Announcements />} />
        </Route>

        {/* PROTECTED: ADMIN ZONE (Staff Only) */}
        <Route element={<ProtectedRoute allowedRoles={['facilitator', 'admin']} />}>
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/marking" element={<Marking />} />
          <Route path="/admin/register-staff" element={<Register />} />
        </Route>

        {/* 404 CATCH ALL */}
        <Route path="*" element={<NoPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
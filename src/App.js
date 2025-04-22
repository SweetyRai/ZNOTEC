import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate
} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import AdminNavbar from './components/AdminNavbar/AdminNavbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Career from './components/Careers/Careers';
import B2B from './components/B2B/B2B';
import Freelancer from './components/Freelancer/Freelancer';
import Footer from './components/Footer/Footer';
import Services from './components/Services/services';
import Contact from './components/Contact/Contact';
import Dashboard from './components/Dashboard/Dashboard';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import RegistrationAndLogin from './components/RegistrationAndLogin/RegistrationAndLogin';
import AdminRegistrationAndLogin from './components/AdminRegistrationAndLogin/AdminRegistrationAndLogin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import ProtectedAdminRoute from './components/AdminDashboard/ProtectedAdminRoute';
import PrivateRoute from './components/PrivateRoute';

import { useEffect, useState } from 'react';

// Wrapper component to access `useLocation` outside `Router`
const AppWrapper = () => {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith('/admin') || location.pathname === '/admin_sign_in';

  return (
    <div className="App">
      {/* Render AdminNavbar only for admin routes */}
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}

      {/* Admin background if needed */}
      <div className="background-shapes"></div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Career />} />
        <Route path="/b2b" element={<B2B />} />
        <Route path="/services" element={<Services />} />
        <Route path="/freelancer" element={<Freelancer />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy_policy' element={<PrivacyPolicy />} />
        <Route path='/terms_and_consition' element={<TermsAndConditions />} />
        <Route path='/sign_in' element={<RegistrationAndLogin />} />
        <Route path='/admin_sign_in' element={<AdminRegistrationAndLogin />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard/dashboard" />} />
        <Route
          path="/dashboard/:tab"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/admin-dashboard" element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        } />
      </Routes>

      {/* Show Footer only if NOT on admin pages */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

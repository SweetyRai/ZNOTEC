// components/AdminDashboard/ProtectedAdminRoute.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.admin);
  return isAuthenticated ? children : <Navigate to="/admin_sign_in" replace />;
};

export default ProtectedAdminRoute;

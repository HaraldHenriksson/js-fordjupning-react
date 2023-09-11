import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
    const { isAuthDetermined, userEmail } = useAuth();

    if (!isAuthDetermined) {
        return null; // Render nothing until auth is determined
    }

    if (!userEmail) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

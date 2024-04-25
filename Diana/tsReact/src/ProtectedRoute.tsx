import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;

    if (!user) {
        // User not logged in, redirect to login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // User is logged in, render the children components
    return children;
};

export default ProtectedRoute;

    

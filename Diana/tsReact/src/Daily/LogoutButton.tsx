import { useAuth } from '../auth/AuthContext';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth();

    if (!isAuthenticated) return null;  // Don't show logout if not logged in

    return (
        <button onClick={logout} style={{ cursor: 'pointer' }}>
            Logout
        </button>
    );
};

export default LogoutButton;

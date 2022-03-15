import { useContext } from 'react';
import AuthContext from '../store/auth-context'
import {Navigate, useLocation} from 'react-router-dom';
  
const ProtectedRoute = ({ children }) => {
    const { accessToken, id } = useContext(AuthContext);
    const location = useLocation();

    if (accessToken && id) {
        return children;
    }

    return <Navigate to="/" replace state={{ from: location }} />;

};

export default ProtectedRoute
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token, userType } = useContext(AuthContext);
  
  if (!token) {
    return <Navigate to={userType === 'admin' ? '/admin-login' : '/'} />;
  }

  return children;
};

export default PrivateRoute;
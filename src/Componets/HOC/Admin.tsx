import { Route } from 'react-router';
import { Navigate } from 'react-router-dom';

const Admins = ({ user, children }:any) => {
    return user?.isAdmin ? children : <Navigate to="/" replace />;
  };
  
  export default Admins;
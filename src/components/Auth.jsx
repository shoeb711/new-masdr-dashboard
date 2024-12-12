import { useLocation, Navigate, Outlet } from "react-router-dom";
import { PATH } from "shared/constant";

const Auth = ({ allowedRoles }) => {
  const location = useLocation();

  const role = localStorage.getItem("role");

  const renderContent = () => {
    if (allowedRoles.includes(role)) {
      return <Outlet />;
    }
    return <Navigate to={PATH.login} state={{ from: location }} replace />;
  };

  return renderContent();
};

export default Auth;

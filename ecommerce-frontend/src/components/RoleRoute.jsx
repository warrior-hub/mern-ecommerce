import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../pages/UserContext";

function RoleRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const { user } = useContext(UserContext);
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <p>Loading...</p>;
  }
  if (user.role!="seller") {
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleRoute;
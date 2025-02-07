/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userdata"));

  // Check if the user is admin
  if (userData?.username !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

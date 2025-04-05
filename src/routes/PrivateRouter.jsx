import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("4ZbFyHHg8uVrN5mP9kL3JhH7");
  return isAuth ? children : <Navigate to="/members" />;
};

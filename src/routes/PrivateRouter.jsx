import { Navigate, Outlet } from "react-router-dom";
import Layout from "../Layout/Layout";

export const ProtectedLayout = () => {
  const isAuth = localStorage.getItem("4ZbFyHHg8uVrN5mP9kL3JhH7");
  return isAuth ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" replace />
  );
};

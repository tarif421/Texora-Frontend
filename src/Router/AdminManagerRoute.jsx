import React from "react";

import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const AdminManagerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (role === "admin" || role === "manager") {
    return children;
  }

  return <Navigate to="/" />;
};
export default AdminManagerRoute;

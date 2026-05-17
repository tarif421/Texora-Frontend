import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import { Navigate } from "react-router";

const BuyerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (role === "buyer") {
    return children;
  }

  return <Navigate to="/" />;
};

export default BuyerRoute;
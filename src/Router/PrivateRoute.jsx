import React from "react";
import { Navigate } from "react-router";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;

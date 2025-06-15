import React from "react";
import { Navigate } from "react-router";

import { useAuth } from "../../hooks";

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === true) return children;
  else return <Navigate to="/login" />;
};

export default ProtectedRoute;

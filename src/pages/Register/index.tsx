import { memo } from "react";
import { Navigate } from "react-router";

import { useAuth } from "../../hooks";

function Register() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === true) return <Navigate to="/" />;
  return <div>Register</div>;
}

export default memo(Register);

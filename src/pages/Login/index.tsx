import { Navigate } from "react-router";

import { useAuth } from "../../hooks";

function Login() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === true) return <Navigate to="/" />;
  return <div>Login</div>;
}

export default Login;

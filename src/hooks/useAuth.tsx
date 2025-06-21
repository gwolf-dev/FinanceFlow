import { useContext } from "react";

import { AuthContext } from "../contexts";

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("[ERROR]: useAuth must be in AuthProvider");

  return auth;
};

export default useAuth;

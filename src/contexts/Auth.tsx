/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

import { UserApi, User } from "../types";

type Auth = {
  isAuthenticated: boolean;
  userData: User | null;
  errorMessage: string | null;
  logout: () => void;
  login: (
    username: string,
    password: string,
    language: "pt-BR" | "en-US"
  ) => Promise<void>;
};

const BASE_URL = import.meta.env.VITE_URL_API;
const messages = {
  "pt-BR": {
    errorMessage: "Token inválido!",
    errorMessageLogin: "Erro ao logar. E-mail ou senha incorretos!",
  },
  "en-US": {
    errorMessage: "Invalid Token!",
    errorMessageLogin: "Error logging in. Incorrect e-mail or password!",
  },
};

export const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userObj = (obj: UserApi) => ({
    id: obj.id,
    name: obj.name,
    email: obj.email,
    img: obj.img,
    cpf: obj.cpf,
    city: obj.city,
    country: obj.country,
    phone: obj.phone,
    birthDate: obj.birthDate,
    language: obj.language,
  });

  const logout = useCallback(() => {
    setError(null);
    setData(null);
    setIsAuthenticated(false);
    window.localStorage.removeItem("token");
  }, []);

  async function login(
    email: string,
    password: string,
    language: "pt-BR" | "en-US"
  ) {
    try {
      setError(null);
      const response = await fetch(
        `${BASE_URL}/users?email=${email || null}&password=${password || null}`
      );
      const result: UserApi[] = await response.json();

      if (result.length === 0) {
        console.error(messages[language].errorMessageLogin);
        setError(messages[language].errorMessageLogin);
        return;
      }

      window.localStorage.setItem("token", result[0].token);
      setData(userObj(result[0]));
      setIsAuthenticated(true);

      navigate("/");
    } catch (error) {
      console.error(error);
      logout();
    }
  }

  useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem("token");

      if (token) {
        try {
          setError(null);
          const response = await fetch(`${BASE_URL}/users?token=${token}`);
          const result: UserApi[] = await response.json();

          if (result.length === 0) {
            console.error(messages["pt-BR"].errorMessage);
            setError(messages["pt-BR"].errorMessage);
            logout();
            return;
          }

          setData(userObj(result[0]));
          setIsAuthenticated(true);
        } catch (error) {
          console.error(error);
          logout();
        }
      } else {
        logout();
      }
    })();
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        userData: data,
        errorMessage: error,
        isAuthenticated,
        logout,
        login,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

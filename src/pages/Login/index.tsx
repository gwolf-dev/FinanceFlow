import { Navigate } from "react-router";

import { useAuth } from "../../hooks";
import { Input, Title } from "../../components";

function Login() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === true) return <Navigate to="/" />;
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8 bg-emerald-50">
      {/**
       * titulo
       * formulario
       * footer do login
       */}
      <Title type="h1" customStyle={"text-green-950"}>
        Tela de login
      </Title>
      <form>
        <Input />
      </form>

      <footer className="text-green-800 font-normal font-base">
        © Todos os direitos reservados
      </footer>
    </div>
  );
}

export default Login;

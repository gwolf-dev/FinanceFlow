import { Navigate } from "react-router";

import translationFile from "./translation";
import { useAuth } from "../../hooks";
import { Button, Input, Title } from "../../components";

function Login() {
  const { isAuthenticated } = useAuth();
  const { language } = navigator;
  const userLanguage =
    language === "pt-BR" || language === "en-US" ? language : "pt-BR";
  const translation = translationFile[userLanguage];

  if (isAuthenticated === true) return <Navigate to="/" />;
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8 bg-emerald-50">
      <Title type="h1" customStyle={"text-green-950"}>
        {translation.title}
      </Title>
      <form className="w-full max-w-md flex flex-col gap-4 px-3">
        <Input
          id="email"
          label={translation.emailLabel}
          placeholder={translation.emailPlaceholder}
          type="email"
        />
        <Input
          id="password"
          label={translation.passwordLabel}
          placeholder={translation.passwordPlaceholder}
          type="password"
        />

        <Button>{translation.button}</Button>
      </form>

      <footer className="text-green-800 font-normal text-base max-md:text-sm">
        {translation.footer}
      </footer>
    </div>
  );
}

export default Login;

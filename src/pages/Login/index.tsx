import { useState } from "react";
import { Navigate } from "react-router";

import translationFile from "./translation";
import { useAuth } from "../../hooks";
import { Button, Input, MessageStatus, Select, Title } from "../../components";

type Language = "pt-BR" | "en-US";

function Login() {
  const { isAuthenticated, login, errorMessage } = useAuth();
  const [language, setLanguage] = useState<Language>("pt-BR");
  const translation = translationFile[language];

  const handleLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setLanguage(value as Language);
  };

  const singnIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.form;
    if (!form) return;

    const formData = new FormData(form);

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    login(email, password, language);
  };

  if (isAuthenticated === true) return <Navigate to="/" />;
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8 bg-white relative">
      <MessageStatus message={errorMessage} type="error" />
      <Title type="h1" customStyle={"text-gray-950"}>
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

        <div className="flex justify-between items-center">
          <Button type="submit" handleClick={singnIn}>
            {translation.button}
          </Button>

          <Select
            onChange={handleLanguage}
            id="languageSelect"
            name="languageSelect"
            language={language}
            options={[
              { value: "pt-BR", text: "pt-BR" },
              { value: "en-US", text: "en-US" },
            ]}
          />
        </div>
      </form>

      <footer className="text-gray-800 font-normal text-base max-md:text-sm">
        {translation.footer}
      </footer>
    </div>
  );
}

export default Login;

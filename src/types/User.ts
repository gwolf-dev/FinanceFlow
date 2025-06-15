import Language from "./LanguageEnum";

type UserApi = {
  id: number;
  name: string;
  email: string;
  password: string;
  img: string | null;
  cpf: number | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  birthDate: string | null;
  language: Language.PORTUGUESE_BR | Language.ENGLISH_US;
  token: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  img: string | null;
  cpf: number | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  birthDate: string | null;
  language: Language.PORTUGUESE_BR | Language.ENGLISH_US;
};

export { UserApi, User };

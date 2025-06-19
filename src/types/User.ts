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
  language: "pt-BR" | "en-US";
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
  language: "pt-BR" | "en-US";
};

export { UserApi, User };

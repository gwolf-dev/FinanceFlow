import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";

import Login from "./";

vi.mock("../../hooks", async () => {
  const actual = await vi.importActual("../../hooks");
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

import { useAuth } from "../../hooks";
const mockedUseAuth = useAuth as ReturnType<typeof vi.fn>;

describe("Login component", () => {
  const loginMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render login form with inputs and button", () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      login: loginMock,
      errorMessage: null,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/e-mail:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha:/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/digite o seu e-mail/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/digite a sua senha/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logar/i })).toBeInTheDocument();
    expect(screen.getByText(/pt-BR/)).toBeInTheDocument();
  });

  it("should call login when form is submitted", () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      login: loginMock,
      errorMessage: null,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId(/password/i), {
      target: { value: "password123" },
    });

    const button = screen.getByRole("button", { name: /logar/i });
    fireEvent.click(button);

    expect(loginMock).toHaveBeenCalledWith(
      "test@example.com",
      "password123",
      "pt-BR"
    );
  });

  it("should switch language when select changes", () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      login: loginMock,
      errorMessage: null,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "en-US" } });

    expect(screen.getByText(/login screen/i)).toBeInTheDocument();
  });

  it("should redirect if already authenticated", () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      login: loginMock,
      errorMessage: null,
      userData: { language: "pt-BR" },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const title = screen.queryByText(/tela de login/i);
    expect(title).not.toBeInTheDocument();

    const form = screen.queryByRole("form");
    expect(form).not.toBeInTheDocument();
  });

  it("shows error message when errorMessage is present", () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      login: loginMock,
      errorMessage: "Invalid credentials",
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});

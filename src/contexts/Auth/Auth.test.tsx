import { useContext } from "react";
import { MemoryRouter } from "react-router";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { vi } from "vitest";
import { AuthProvider, AuthContext } from ".";

const mockUser = {
  id: 1,
  name: "User",
  email: "user@mail.com",
  token: "abc123",
  language: "pt-BR",
  img: "",
  cpf: "",
  city: "",
  country: "",
  phone: "",
  birthDate: "",
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  const TestComponent = () => {
    const auth = useContext(AuthContext);

    return (
      <div>
        <button onClick={() => auth?.login("user@mail.com", "123", "pt-BR")}>
          Logar
        </button>
        <button onClick={() => auth?.logout()}>Sair</button>
        <div data-testid="auth-status">{String(auth?.isAuthenticated)}</div>
        <div data-testid="user-name">{auth?.userData?.name || ""}</div>
        <div data-testid="error-msg">{auth?.errorMessage || ""}</div>
      </div>
    );
  };

  it("sign in successfully and updates context", async () => {
    vi.spyOn(window, "fetch").mockResolvedValueOnce({
      json: async () => [mockUser],
    } as Response);

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    );

    act(() => {
      fireEvent.click(screen.getByText(/logar/i));
    });

    await waitFor(() => {
      expect(screen.getByTestId("auth-status").textContent).toBe("true");
      expect(screen.getByTestId("user-name").textContent).toBe("User");
      expect(localStorage.getItem("token")).toBe("abc123");
    });
  });

  it("shows error if login fails", async () => {
    vi.spyOn(window, "fetch").mockResolvedValueOnce({
      json: async () => [],
    } as Response);

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    );

    act(() => {
      fireEvent.click(screen.getByText(/logar/i));
    });

    await waitFor(() => {
      expect(screen.getByTestId("auth-status").textContent).toBe("false");
      expect(screen.getByTestId("error-msg").textContent).toBe(
        "Erro ao logar. E-mail ou senha incorretos!"
      );
    });
  });

  it("logs out and clears state", async () => {
    localStorage.setItem("token", "abc123");

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    );

    act(() => {
      fireEvent.click(screen.getByText(/sair/i));
    });

    expect(screen.getByTestId("auth-status").textContent).toBe("false");
    expect(screen.getByTestId("user-name").textContent).toBe("");
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("loads user from localStorage on mount", async () => {
    localStorage.setItem("token", "abc123");

    vi.spyOn(window, "fetch").mockResolvedValueOnce({
      json: async () => [mockUser],
    } as Response);

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("auth-status").textContent).toBe("true");
      expect(screen.getByTestId("user-name").textContent).toBe("User");
    });
  });

  it("clears context if token is invalid on mount", async () => {
    localStorage.setItem("token", "invalid-token");

    vi.spyOn(window, "fetch").mockResolvedValueOnce({
      json: async () => [],
    } as Response);

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("auth-status").textContent).toBe("false");
      expect(screen.getByTestId("user-name").textContent).toBe("");
      expect(screen.getByTestId("error-msg").textContent).toBe(
        "Token inválido!"
      );
    });
  });
});

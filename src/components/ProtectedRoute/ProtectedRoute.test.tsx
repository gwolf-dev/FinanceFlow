import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";

import ProtectedRoute from "./";

vi.mock("../../hooks", async () => {
  const actual = await vi.importActual("../../hooks");
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      isAuthenticated: false,
    })),
  };
});

import { useAuth } from "../../hooks";
const mockedUseAuth = useAuth as ReturnType<typeof vi.fn>;

describe("ProtectedRoute", () => {
  it("renders children when user is authenticated", () => {
    mockedUseAuth.mockReturnValueOnce({ isAuthenticated: true });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Private Content</h1>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText(/private content/i)).toBeInTheDocument();
  });

  it("redirects to public page when user is not authenticated", () => {
    mockedUseAuth.mockReturnValueOnce({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/private"]}>
        <ProtectedRoute>
          <h1>Private Content</h1>
        </ProtectedRoute>
        <h1>Public Content</h1>
      </MemoryRouter>
    );

    expect(screen.queryByText(/private content/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/public content/i)).toBeInTheDocument();
  });
});

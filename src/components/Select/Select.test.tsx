import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Select from "./";

vi.mock("../../hooks", async () => {
  const actual = await vi.importActual("../../hooks");

  return {
    ...actual,
    useAuth: vi.fn(() => ({
      userData: { language: "pt-BR" },
    })),
  };
});

import { useAuth } from "../../hooks";
const mockedUseAuth = useAuth as ReturnType<typeof vi.fn>;

describe("Select component", () => {
  const options = [
    { value: "1", text: "Option One" },
    { value: "2", text: "Option Two" },
  ];

  it("renders the select element", () => {
    render(<Select options={options} />);
    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();
  });

  it("renders the translated default option (from user language)", () => {
    render(<Select options={options} />);
    expect(screen.getByText(/selecione uma opção/i)).toBeInTheDocument();
  });

  it("renders all passed options", () => {
    render(<Select options={options} />);

    expect(screen.getByText(/option one/i)).toBeInTheDocument();
    expect(screen.getByText(/option two/i)).toBeInTheDocument();
  });

  it("sets a value and accepts user selection", () => {
    render(<Select options={options} defaultValue="2" />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(select.value).toBe("2");
  });

  it("renders and changes value via fireEvent", () => {
    render(<Select options={options} />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(select.value).toBe("1");
    fireEvent.change(select, { target: { value: "2" } });
    expect(select.value).toBe("2");
    expect(screen.getByText(/option two/i)).toBeInTheDocument();
  });

  it("uses fallback language when userData is null", () => {
    mockedUseAuth.mockReturnValueOnce({ userData: null });

    render(<Select options={options} language="en-US" />);

    expect(screen.getByText(/select a option/i)).toBeInTheDocument();
  });
});

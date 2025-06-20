import { render, screen, fireEvent } from "@testing-library/react";

import Input from "./";
import style from "./style";

describe("Input component", () => {
  it("renders the input in the DOM", () => {
    render(<Input id="email" />);
    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
  });

  it("renders the label when provided", () => {
    render(<Input id="name" label="Full Name" />);
    const input = screen.getByLabelText("Full Name");

    expect(input).toBeInTheDocument();
  });

  it("does not render a label when label is null", () => {
    render(<Input id="phone" label={null} />);
    const label = screen.queryByLabelText(/phone/i);

    expect(label).not.toBeInTheDocument();
  });

  it("accepts placeholder and input type", () => {
    render(
      <Input id="password" type="password" placeholder="Enter your password" />
    );
    const input = screen.getByPlaceholderText("Enter your password");

    expect(input).toHaveAttribute("type", "password");
  });

  it("allows user to type in the input", () => {
    render(<Input id="username" />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "John" } });
    expect(input).toHaveValue("John");
  });

  it("calls onChange when input value changes", () => {
    const handleChange = vi.fn();
    render(<Input id="email" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("has the correct default CSS classes", () => {
    render(<Input id="styled" label={"E-mail"} />);
    const input = screen.getByRole("textbox");
    const label = screen.getByText("E-mail");

    expect(input).toHaveClass(style.input);
    expect(label).toHaveClass(style.label);
  });
});

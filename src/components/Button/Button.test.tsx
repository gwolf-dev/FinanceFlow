import { render, screen, fireEvent } from "@testing-library/react";

import Button from "./";
import { button } from "./style";

describe("Button component", () => {
  it("renders button with correct text", () => {
    render(<Button handleClick={() => {}}>Click here</Button>);
    const btn = screen.getByRole("button");

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(/click here/i);
  });

  it("has correct CSS classes", () => {
    render(<Button handleClick={() => {}}>Click here</Button>);
    const btn = screen.getByRole("button");

    expect(btn).toHaveClass(button);
  });

  it("should have type submit", () => {
    render(
      <Button handleClick={() => {}} type="submit">
        Click here
      </Button>
    );
    const btn = screen.getByRole("button");

    expect(btn).toHaveAttribute("type", "submit");
  });

  it("calls onClick handler when clicked", () => {
    const onClick = vi.fn();
    render(<Button handleClick={onClick}>Click here</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

import { render, screen, act } from "@testing-library/react";
import { vi } from "vitest";

import MessageStatus from "./";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe("MessageStatus component", () => {
  it("does not render anything when message is null", () => {
    render(<MessageStatus type="success" message={null} />);
    const element = screen.getByTestId("messageStatus");

    expect(element).toHaveClass("opacity-0", "invisible");
  });

  it("renders message with correct text", () => {
    render(<MessageStatus type="success" message="Operation successful" />);
    expect(screen.getByText("Operation successful")).toBeInTheDocument();
  });

  it("applies correct style for success message", () => {
    render(<MessageStatus type="success" message="Success!" />);
    const element = screen.getByText("Success!");

    expect(element).toHaveClass("bg-green-500", "text-green-950");
  });

  it("applies correct style for error message", () => {
    render(<MessageStatus type="error" message="Something went wrong" />);
    const element = screen.getByText("Something went wrong");

    expect(element).toHaveClass("bg-red-500", "text-red-950");
  });

  it("applies correct style for warning message", () => {
    render(<MessageStatus type="warning" message="Be careful" />);
    const element = screen.getByText("Be careful");

    expect(element).toHaveClass("bg-yellow-500", "text-yellow-950");
  });

  it("is visible when message is shown and hides after 3 seconds", () => {
    render(<MessageStatus type="success" message="Auto hide test" />);
    const element = screen.getByText("Auto hide test");

    expect(element).toHaveClass("opacity-100", "visible");

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(element).toHaveClass("opacity-0", "invisible");
  });
});

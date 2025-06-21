import { render, screen } from "@testing-library/react";

import Loading from "./";

describe("Loading component", () => {
  it("renders with small size styles", () => {
    render(<Loading size="sm" />);

    const container = screen.getByTestId("container");
    const loading = screen.getByTestId("loading");

    expect(container).toHaveClass("w-full h-full");

    expect(loading).toHaveClass("w-8 h-8 border-6");
  });

  it("renders with large size styles", () => {
    render(<Loading size="lg" />);

    const container = screen.getByTestId("container");
    const loading = screen.getByTestId("loading");

    expect(container).toHaveClass("w-screen h-screen");

    expect(loading).toHaveClass("w-16 h-16 border-8");
  });
});

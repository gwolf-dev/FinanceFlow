import { render, screen } from "@testing-library/react";

import Title from "./";

describe("Title component", () => {
  it("renders as h1 by default", () => {
    render(<Title>Default Title</Title>);
    const title = screen.getByText("Default Title");

    expect(title.tagName).toBe("H1");
  });

  it("renders as h2 when type is 'h2'", () => {
    render(<Title type="h2">Heading 2</Title>);
    const title = screen.getByText("Heading 2");

    expect(title.tagName).toBe("H2");
  });

  it("renders as h3 when type is 'h3'", () => {
    render(<Title type="h3">Heading 3</Title>);
    const title = screen.getByText("Heading 3");

    expect(title.tagName).toBe("H3");
  });

  it("renders as h4 when type is 'h4'", () => {
    render(<Title type="h4">Heading 4</Title>);
    const title = screen.getByText("Heading 4");

    expect(title.tagName).toBe("H4");
  });

  it("renders as h5 when type is 'h5'", () => {
    render(<Title type="h5">Heading 5</Title>);
    const title = screen.getByText("Heading 5");

    expect(title.tagName).toBe("H5");
  });

  it("applies custom className when passed", () => {
    render(<Title customStyle="underline">Custom Styled Title</Title>);
    const title = screen.getByText("Custom Styled Title");

    expect(title).toHaveClass("underline");
  });
});

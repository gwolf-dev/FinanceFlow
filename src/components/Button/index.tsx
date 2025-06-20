import React from "react";

import { button } from "./style";

type ButtonProps = React.ComponentProps<"button"> & {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  handleClick = () => {},
  type = "button",
  children,
}: ButtonProps) => (
  <button type={type} onClick={handleClick} className={button}>
    {children}
  </button>
);

export default Button;

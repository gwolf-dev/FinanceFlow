import React from "react";

const Button = ({ children }: React.ComponentProps<"button">) => (
  <button className="w-fit cursor-pointer bg-green-600 text-green-950 px-4 py-2 rounded-sm font-medium hover:bg-green-500 transition duration-200 ease-in-out">
    {children}
  </button>
);

export default Button;

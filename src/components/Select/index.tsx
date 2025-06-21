import React from "react";

import style from "./style";
import translationFile from "./translation";
import { useAuth } from "../../hooks";

type Option = { text: string; value: string };

type SelectProps = React.ComponentProps<"select"> & {
  options: Option[];
  language?: "pt-BR" | "en-US";
};

const Select = ({ options, language, ...rest }: SelectProps) => {
  const { userData } = useAuth();
  const translation =
    translationFile[userData?.language || language || "pt-BR"];

  return (
    <select className={style.select} {...rest}>
      <option disabled>{translation.defaultOption}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;

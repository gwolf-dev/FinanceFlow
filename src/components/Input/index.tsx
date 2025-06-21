import React from "react";

import style from "./style";

type Input = React.ComponentProps<"input"> & {
  id: string;
  label?: string | null;
};

const Input = ({ id, label, ...restProps }: Input) => {
  return (
    <fieldset>
      {label && (
        <label htmlFor={id} className={style.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        data-testid={id}
        className={style.input}
        {...restProps}
      />
    </fieldset>
  );
};

export default Input;

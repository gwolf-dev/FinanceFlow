type Input = React.ComponentProps<"input"> & {
  id: string;
  label?: string | null;
};

const Input = ({ id, label, ...restProps }: Input) => {
  return (
    <fieldset>
      {label && (
        <label
          htmlFor={id}
          className="text-gray-600 ml-0.5 text-base block max-md:text-sm">
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        className="w-full h-10 outline-none border-2 border-gray-400 rounded-sm pl-2 focus:border-green-800 focus:ring-1 focus:ring-green-300 text-gray-600 placeholder-gray-400 max-md:h-8 max-md:text-sm"
        {...restProps}
      />
    </fieldset>
  );
};

export default Input;

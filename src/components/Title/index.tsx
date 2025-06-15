import { useRef } from "react";

type TitleProps = {
  type?: "h1" | "h2" | "h3" | "h4" | "h5";
  customStyle?: string;
  children: string;
};

const Title = ({ type, customStyle, children }: TitleProps) => {
  const customStyleRef = useRef(customStyle);

  switch (type) {
    case "h1":
      return (
        <h1
          className={`text-4xl text-gray-950 font-bold ${customStyleRef.current}`}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`text-3xl text-gray-950 font-bold ${customStyleRef.current}`}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`text-2xl text-gray-900 font-semibold ${customStyleRef.current}`}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={`text-xl text-gray-900 font-semibold ${customStyleRef.current}`}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5
          className={`text-lg text-gray-900 font-semibold ${customStyleRef.current}`}>
          {children}
        </h5>
      );
    default:
      return (
        <h1
          className={`text-4xl text-gray-950 font-bold ${customStyleRef.current}`}>
          {children}
        </h1>
      );
  }
};

export default Title;

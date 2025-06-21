import { useRef } from "react";

import style from "./style";

type LoadingProps = {
  size: "sm" | "lg";
};

const Loading = ({ size }: LoadingProps) => {
  const styleRef = useRef({
    container: size === "sm" ? "w-full h-full" : "w-screen h-screen",
    loading: size === "sm" ? "h-8 w-8 border-6" : "h-16 w-16 border-8",
  });

  return (
    <div
      data-testid="container"
      className={`${style.container} ${styleRef.current.container}`}>
      <span
        data-testid="loading"
        className={`${style.loading} ${styleRef.current.loading}`}></span>
    </div>
  );
};

export default Loading;

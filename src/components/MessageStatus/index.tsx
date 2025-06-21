import { useRef, useState, useEffect } from "react";

import style from "./style";

type MessageStatusProps = {
  type: "error" | "success" | "warning";
  message: string | null;
};

const MessageStatus = ({ type, message }: MessageStatusProps) => {
  const styleTypeRef = useRef(
    type === "success"
      ? "bg-green-500 text-green-950"
      : type === "error"
      ? "bg-red-500 text-red-950"
      : "bg-yellow-500 text-yellow-950"
  );
  const [hiddenMessage, setHiddenMessage] = useState("opacity-0 invisible");

  useEffect(() => {
    if (message !== null && message.length) {
      setHiddenMessage("opacity-100 visible");

      const timeout = setTimeout(
        () => setHiddenMessage("opacity-0 invisible"),
        3000
      );

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [message]);

  return (
    <div
      data-testid="messageStatus"
      className={`${style.messageStatus} ${styleTypeRef.current} ${hiddenMessage}`}>
      {message}
    </div>
  );
};

export default MessageStatus;

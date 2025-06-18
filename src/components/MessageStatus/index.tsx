import { useRef, useState, useEffect } from "react";

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
      className={`w-fit px-4 py-2 fixed top-4 right-4 rounded-sm z-50 transition ease-in-out 300ms ${styleTypeRef.current} ${hiddenMessage}`}>
      {message}
    </div>
  );
};

export default MessageStatus;

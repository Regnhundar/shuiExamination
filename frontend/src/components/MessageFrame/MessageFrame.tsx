import { ReactNode } from "react";
import "./messageFrame.css";

interface Props {
  children: ReactNode;
}

const MessageFrame: React.FC<Props> = ({ children }) => {
  return <div className="message">{children}</div>;
};

export default MessageFrame;

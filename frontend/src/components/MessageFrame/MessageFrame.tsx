import React, { ReactNode } from "react";
import "./messageFrame.css";

interface Props {
    html?: "div" | "article";
    children: ReactNode;
}
//html sätts till "div" som default
const MessageFrame: React.FC<Props> = ({ html = "div", children }) => {
    // React.createElement gör, precis som namnet, ett html element. Nu definierat av html prop.
    return React.createElement(html, { className: "message" }, children);
};

export default MessageFrame;

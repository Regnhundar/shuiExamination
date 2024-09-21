import "./textButton.css";

interface Props {
    textContent: string;
    type?: "button" | "submit";
    onClick?: () => void;
    valid?: boolean;
}

const TextButton: React.FC<Props> = ({
    textContent,
    type = "button",
    onClick,
    valid = true,
}) => {
    return (
        <button
            type={type}
            className={`text-button ${!valid ? "text-button--invalid" : ""}`}
            onClick={onClick}
        >
            {textContent}
        </button>
    );
};

export default TextButton;

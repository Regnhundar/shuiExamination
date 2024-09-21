import "./iconButton.css";
import { Link } from "react-router-dom";

interface Props {
    style: string;
    to: string;
    aria: string;
}

const IconButton: React.FC<Props> = ({ style, to, aria }) => {
    return (
        <Link
            className={`icon-button icon-button--${style}`}
            to={to}
            aria-label={aria}
        />
    );
};

export default IconButton;

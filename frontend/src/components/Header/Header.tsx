import { Link } from "react-router-dom";
import "./header.css";

const Header: React.FC = () => {
    return (
        <header className="header">
            <Link className="header__logotype" to="/" aria-label="Navigate back home.">
                S
            </Link>
        </header>
    );
};

export default Header;

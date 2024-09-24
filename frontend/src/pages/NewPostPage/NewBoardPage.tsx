import MessageFrame from "../../components/MessageFrame/MessageFrame";
import TextButton from "../../components/TextButton/TextButton";
import { postMessage } from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newBoardPage.css";
import { verifyPost } from "../../utilities/utilityFunctions";

const NewBoardPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const isValid = verifyPost(username, message);

    const navigate = useNavigate();

    const handlePostMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await postMessage(username, message);
        if (result.success) {
            navigate("/");
        } else {
            setErrorMessage(result.message || "An error occurred. Please try again.");
        }
    };

    return (
        <form className="post-form section-wrapper" onSubmit={isValid ? handlePostMessage : undefined}>
            <MessageFrame>
                <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    name="text"
                    id="text"
                    className="message__text-input"
                    minLength={3}
                    maxLength={300}
                    required
                />
                <span className="message__length-indicator">{`${message.length}/300`}</span>
            </MessageFrame>
            {errorMessage.length > 1 ? <h2 className="post-form__error-message">{errorMessage}</h2> : ""}
            <input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Användarnamn..."
                type="text"
                name="username"
                id="username"
                className="post-form__username"
                minLength={3}
                maxLength={20}
                autoComplete="off" // Om det är på så kommer den vita textindikatorn att försvinna när man väljer namn i listan.
                required
            />
            <TextButton type={"submit"} textContent="Publicera" valid={isValid} />
        </form>
    );
};

export default NewBoardPage;

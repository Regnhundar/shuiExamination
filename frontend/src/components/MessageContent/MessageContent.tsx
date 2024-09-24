import "./messageContent.css";
import { Message } from "../../pages/MessageBoardPage/MessageBoardPage";
import { formatDate } from "../../utilities/utilityFunctions";
import { useNavigate } from "react-router-dom";

interface Props {
    message: Message;
    handleMessageSort: () => void;
    handleToggleEdit: (pk: string, sk: string, text: string) => void;
    handleDeleteMessage: (pk: string, sk: string) => void;
    isEditable: string | null;
    setIsEditable: (argument: null) => void;
    newText: string;
    setNewText: (value: string) => void;
}
const MessageContent: React.FC<Props> = ({
    message,
    handleMessageSort,
    handleToggleEdit,
    handleDeleteMessage,
    isEditable,
    setIsEditable,
    newText,
    setNewText,
}) => {
    const navigate = useNavigate();

    return (
        <>
            <h3 className="message__date" onClick={handleMessageSort} title="Vänd på datumsorteringen.">
                {formatDate(message.sk)}
            </h3>
            <div className="message__button-wrapper">
                <button
                    onClick={() => handleToggleEdit(message.pk, message.sk, message.text)}
                    className={`message__button ${isEditable === message.pk ? "message__button--save" : "message__button--edit"}`}
                    title={isEditable === message.pk ? "Spara dina förändringar." : "Editera meddelandet."}></button>
                <button
                    className="message__button message__button--delete"
                    title="Radera meddelandet."
                    onClick={() => {
                        handleDeleteMessage(message.pk, message.sk);
                    }}></button>
            </div>
            {isEditable === message.pk ? (
                <>
                    <textarea
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="message__edit-textarea"
                        minLength={3}
                        maxLength={300}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") {
                                setIsEditable(null);
                            }
                        }}
                        required
                    />
                    <span className="message__word-count">{`${newText.length}/300`}</span>
                </>
            ) : (
                <p className="message__bread">{message.text}</p>
            )}
            {message.errorMessage && (
                <h3 key={message.errorId} className="message__error-message">
                    {message.errorMessage}
                </h3>
            )}
            <h2
                className="message__signature"
                onClick={() => navigate(`?username=${message.username}`)}
                title={`Hitta alla meddelanden från ${message.username}`}>
                {message.username}
            </h2>
        </>
    );
};

export default MessageContent;

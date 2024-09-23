import MessageFrame from "../../components/MessageFrame/MessageFrame";
import "./messageBoardPage.css";
import { useEffect, useState } from "react";
import { getMessages, deleteMessage, updateMessage } from "../../api";
import { formatDate } from "../../utilities/utilityFunctions";
import IconButton from "../../components/IconButton/IconButton";

interface Message {
    pk: string;
    sk: string;
    text: string;
    username: string;
    errorMessage?: string;
}

const MessageBoardPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditable, setIsEditable] = useState<string | null>(null); // Används som boolean. Sparar ned pk. isEditable === message.pk blir då en boolean.
    const [newText, setNewText] = useState("");

    useEffect(() => {
        getMessages().then((messagesData) => {
            setMessages(messagesData);
            setIsLoading(false);
        });
    }, []);

    const handleDeleteMessage = async (pk: string, sk: string) => {
        const deletePost = await deleteMessage(pk, sk);
        if (deletePost.success) {
            const filteredMessages = messages.filter((message) => message.pk !== pk);
            setMessages(filteredMessages);
        } else {
            const updatedMessages = messages.map((message) => (message.pk === pk ? { ...message, errorMessage: deletePost.message } : message));
            setMessages(updatedMessages);
        }
    };

    const handleUpdateMessage = async (pk: string, sk: string) => {
        const index = messages.findIndex((message) => message.sk === sk);

        if (messages[index].text === newText) {
            return setIsEditable(null); // Inget ska ändras. Avbryt basically.
        }

        const updatedMessages = [...messages];

        if (newText.length < 3) {
            // Anropa inte api om vi vet att det kommer misslyckas. Lägg till en errorMessage property i objektet och rendera ut det i komponent.
            updatedMessages[index] = { ...updatedMessages[index], errorMessage: "Meddelande måste vara minst 3 tecken." };
            setMessages(updatedMessages);
            return;
        }
        const updatePost = await updateMessage(pk, sk, newText);

        if (updatePost.success) {
            if (index !== -1) {
                // Lägg in ny text, rensa error, uppdatera komponent och stäng editorn.
                updatedMessages[index] = { ...updatedMessages[index], text: newText, errorMessage: "" };
                setMessages(updatedMessages);
                setIsEditable(null);
            }
        } else {
            // Lägg in error från api i objekt och uppdatera komponent.
            updatedMessages[index] = { ...updatedMessages[index], errorMessage: updatePost.message };
            setMessages(updatedMessages);
        }
    };

    return (
        <main className="message-board">
            {isLoading ? (
                <h2 className="loading-message">Loading...</h2>
            ) : (
                <>
                    {messages.map((message) => (
                        <MessageFrame html={"article"} key={message.pk}>
                            <h3 className="message__date">{formatDate(message.sk)}</h3>

                            <div className="message__button-wrapper">
                                <button
                                    onClick={() => {
                                        if (isEditable === message.pk) {
                                            handleUpdateMessage(message.pk, message.sk);
                                        } else {
                                            setIsEditable(message.pk);
                                            setNewText(message.text);
                                        }
                                    }}
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
                            {message.errorMessage && <h3 className="message__error-message">{message.errorMessage}</h3>}
                            <h2 className="message__signature">{message.username}</h2>
                        </MessageFrame>
                    ))}
                    <IconButton style={"post"} aria={"Create a message."} to={"/new-post"} />
                </>
            )}
        </main>
    );
};

export default MessageBoardPage;

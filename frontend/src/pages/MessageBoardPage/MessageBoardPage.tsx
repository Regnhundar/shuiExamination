import MessageFrame from "../../components/MessageFrame/MessageFrame";
import "./messageBoardPage.css";
import { useEffect, useState } from "react";
import { getMessages, deleteMessage, updateMessage } from "../../api";
import IconButton from "../../components/IconButton/IconButton";
import { useLocation } from "react-router-dom";
import MessageContent from "../../components/MessageContent/MessageContent";

export interface Message {
    pk: string;
    sk: string;
    text: string;
    username: string;
    errorMessage?: string;
    errorId?: number;
}

const MessageBoardPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [jumbotron, setJumbotron] = useState(""); // Används för att visa felmeddelande för sidan.
    const [isEditable, setIsEditable] = useState<string | null>(null); // Används som boolean. Sparar ned pk. isEditable === message.pk blir då en boolean.
    const [newText, setNewText] = useState("");
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const username = searchParams.get("username");
        setIsLoading(true);
        getMessages(username)
            .then((messagesData) => {
                const { items, message, success } = messagesData;
                if (success) {
                    const sortedItems = items.sort((a, b) => (a.sk > b.sk ? -1 : 1));
                    setMessages(sortedItems);
                    setJumbotron("");
                } else {
                    setJumbotron(message);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [location.search]); //useEffect baserad på url. Om queryParam username är med hämtas alla meddelanden från den usern. Annars hämtas alla meddelanden.

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
        const index = messages.findIndex((message) => message.pk === pk);

        if (messages[index].text === newText) {
            return setIsEditable(null); // Inget ska ändras. Avbryt basically.
        }

        const updatedMessages = [...messages];

        if (newText.length < 3) {
            // Anropa inte api om vi vet att det kommer misslyckas. Lägg till en errorMessage property i objektet och rendera ut det i komponent.
            // timestamp för att tvinga omrendering vid upprepade error. Används som key i komponent.
            updatedMessages[index] = { ...updatedMessages[index], errorMessage: "Meddelande måste vara minst 3 tecken.", errorId: Date.now() };
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

    const handleMessageSort = () => {
        const copyOfMessages = [...messages];
        setMessages(copyOfMessages.reverse());
    };

    const handleToggleEdit = (pk: string, sk: string, text: string) => {
        {
            if (isEditable === pk) {
                handleUpdateMessage(pk, sk);
            } else {
                setIsEditable(pk);
                setNewText(text);
            }
        }
    };

    return (
        <div className="section-wrapper">
            <main className="message-board">
                {isLoading ? (
                    <h2 className="loading-message">Loading...</h2>
                ) : (
                    <>
                        {messages.length < 1 ? <h2 className="message-board__jumbotron">{jumbotron}</h2> : ""} {/*Error-meddelanden. */}
                        {messages.map((message) => (
                            <MessageFrame html={"article"} key={message.pk}>
                                <MessageContent
                                    message={message}
                                    handleMessageSort={handleMessageSort}
                                    handleToggleEdit={handleToggleEdit}
                                    handleDeleteMessage={handleDeleteMessage}
                                    isEditable={isEditable}
                                    setIsEditable={setIsEditable}
                                    newText={newText}
                                    setNewText={setNewText}
                                />
                            </MessageFrame>
                        ))}
                        <IconButton style={"post"} aria={"Create a message."} to={"/new-post"} />
                    </>
                )}
            </main>
        </div>
    );
};

export default MessageBoardPage;

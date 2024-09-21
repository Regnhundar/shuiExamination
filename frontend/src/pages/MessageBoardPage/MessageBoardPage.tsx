import MessageFrame from "../../components/MessageFrame/MessageFrame";
import "./messageBoardPage.css";
import { useEffect, useState } from "react";
import { getMessages, deleteMessage } from "../../api";
import { formatDate } from "../../utilities/utilityFunctions";
import IconButton from "../../components/IconButton/IconButton";

interface Message {
    pk: string;
    sk: string;
    text: string;
    username: string;
}

const MessageBoardPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMessages().then((messagesData) => {
            setMessages(messagesData);
            setIsLoading(false);
        });
    }, []);

    const handleDeleteMessage = async (e: React.MouseEvent, pk: string, sk: string) => {
        e.preventDefault();
        const deleteSuccesful = await deleteMessage(pk, sk);
        if (deleteSuccesful) {
            const filteredMessages = messages.filter((message) => message.pk !== pk);
            setMessages(filteredMessages);
        } else {
            console.error("Buhuu det gick inte att radera");
        }
    };

    return (
        <main className="message-board section-wrapper">
            {isLoading ? (
                <h2 className="loading-message">Loading...</h2>
            ) : (
                <>
                    {messages.map((message) => (
                        <MessageFrame html={"article"} key={message.pk}>
                            <h3 className="message__date">{formatDate(message.sk)}</h3>
                            <div className="message__button-wrapper">
                                <button
                                    className="message__edit-button"
                                    title="Editera meddelandet."
                                ></button>
                                <button
                                    className="message__delete-button"
                                    title="Radera meddelandet."
                                    onClick={(e) => handleDeleteMessage(e, message.pk, message.sk)}
                                ></button>
                            </div>

                            <p className="message__bread">{message.text}</p>
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

import MessageFrame from "../../components/MessageFrame/MessageFrame";
import "./messageBoardPage.css";
import { useEffect, useState } from "react";
import { getMessages } from "../../api";



interface Message {
    pk: string; 
    sk: string; 
    text: string; 
    username: string; 
}



const MessageBoardPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(()=> {
        const fetchMessages = async () => {
            try {
                const messagesData = await getMessages();
                setMessages(messagesData);
                
            } catch (error) {
                console.error("Failed to fetch messages", error);
            }
        };
        fetchMessages();
    },[])

    return (
        <main className="message-board section-wrapper">
            {messages.map(message => (
                <MessageFrame key={message.pk}> {/* Use a unique key for each item */}
                    <h3 className="message__date">{message.sk}</h3>
                    <p className="message__bread">{message.text}</p>
                    <h2 className="message__signature">{message.username}</h2> {/* Added closing brace */}
                </MessageFrame>
            ))}
        </main>
    );
    
};

export default MessageBoardPage;

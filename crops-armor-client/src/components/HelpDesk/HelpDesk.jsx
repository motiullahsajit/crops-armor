import { useState } from "react";
import "./HelpDesk.css";

const HelpDeskChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Expert Sadman",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "Hello! How can I assist you with Crops Armor today?",
      type: "other",
      reactions: { like: 3 },
    },
    {
      id: 2,
      user: "You",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "Hi! Can Crops Armor help me monitor soil moisture for my corn crops?",
      type: "self",
      reactions: { like: 0 },
    },
    {
      id: 3,
      user: "Expert Sadman",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "Yes, definitely! Crops Armor will use soil moisture sensors to track moisture levels. You'll get real-time alerts if your crops need watering.",
      type: "other",
      reactions: { like: 5 },
    },
    {
      id: 4,
      user: "You",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "That sounds great! How do I set up notifications?",
      type: "self",
      reactions: { like: 0 },
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleAddMessage = () => {
    if (newMessage.trim() === "") return;

    const newEntry = {
      id: messages.length + 1,
      user: "You",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid", // Placeholder avatar for current user
      text: newMessage,
      type: "self",
      reactions: { like: 0 },
    };

    setMessages([...messages, newEntry]);
    setNewMessage("");
  };

  const handleReaction = (id) => {
    const updatedMessages = messages.map((message) =>
      message.id === id
        ? { ...message, reactions: { like: message.reactions.like + 1 } }
        : message
    );
    setMessages(updatedMessages);
  };

  return (
    <main className="forum">
      <div className="container mx-auto py-8">
        <div className="chatContainer">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${
                message.type === "self" ? "self" : "other"
              }`}
            >
              <div className="userContainer">
                <img
                  src={message.avatar}
                  alt={`${message.user}'s avatar`}
                  className={`avatar ${
                    message.type === "self" ? "avatarSelf" : ""
                  }`}
                />
              </div>
              <div className="bubble">
                {message.type === "other" && <strong>{message.user}</strong>}
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="newMessage">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="input"
          />
          <button onClick={handleAddMessage} className="sendButton">
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default HelpDeskChat;

import { useState } from "react";
import "./Forum.css";

const Forum = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Alice",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "Hey everyone! Welcome to the Golden Vault forum!",
      type: "other",
      reactions: { like: 3 },
    },
    {
      id: 2,
      user: "Bob",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "This platform is awesome. Great work, team!",
      type: "other",
      reactions: { like: 5 },
    },
    {
      id: 3,
      user: "Charlie",
      avatar:
        "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611716.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "Looking forward to new features. Any plans for more campaigns?",
      type: "other",
      reactions: { like: 2 },
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
              {message.type === "other" && (
                <div className="userContainer">
                  <img
                    src={message.avatar}
                    alt={`${message.user}'s avatar`}
                    className="avatar"
                  />
                </div>
              )}
              {message.type === "self" && (
                <div className="userContainer">
                  <img
                    src={message.avatar}
                    alt={`${message.user}'s avatar`}
                    className={`avatar avatarSelf`}
                  />
                </div>
              )}
              <div className="bubble">
                {message.type === "other" && <strong>{message.user}</strong>}
                <p>{message.text}</p>
                <div className="reactions">
                  <button
                    className="likeButton"
                    onClick={() => handleReaction(message.id)}
                  >
                    👍 {message.reactions.like}
                  </button>
                </div>
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

export default Forum;

import { useState } from "react";
import "./Forum.css";

const Forum = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Farmer Ahsan",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "Hello everyone! How can I use Crops Armor to improve water management for my rice fields?",
      type: "other",
      reactions: { like: 4 },
    },
    {
      id: 2,
      user: "Expert Sadman",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "Hi Ahsan! You can use the water level sensor data to monitor irrigation needs. Crops Armor will notify you when your fields need watering based on soil moisture levels.",
      type: "other",
      reactions: { like: 6 },
    },
    {
      id: 3,
      user: "Farmer Bina",
      avatar:
        "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611716.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "Does Crops Armor help with pest control too? My tomatoes are constantly under attack by insects.",
      type: "other",
      reactions: { like: 3 },
    },
    {
      id: 4,
      user: "Expert Ishita",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM0EWKy7UNg9fKhvoYaJ90d_ZbSD3AjhyVfw&s",
      text: "Hi Bina! Crops Armor can integrate with pest sensors that detect motion in your fields. It will alert you if any suspicious activity is detected. Additionally, you can monitor the health of your crops using Argo Bot for further insights.",
      type: "other",
      reactions: { like: 5 },
    },
    {
      id: 5,
      user: "Farmer Jamal",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "Can Crops Armor provide insights on drought conditions for my wheat crops?",
      type: "other",
      reactions: { like: 2 },
    },
    {
      id: 6,
      user: "Expert Sajit",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "Absolutely, Jamal! Crops Armor uses real-time weather data and soil moisture readings to forecast drought conditions. You'll receive early warnings based on local climate and sensor data, helping you plan ahead.",
      type: "other",
      reactions: { like: 4 },
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

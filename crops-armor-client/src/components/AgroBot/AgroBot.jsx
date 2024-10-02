import { useState } from "react";
import "./AgroBot.css";

const AgroBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "You",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "Hi AgroBot! How can I improve water management for my rice fields?",
      type: "self",
      messageType: "text",
      reactions: { like: 0 },
    },
    {
      id: 2,
      user: "AgroBot",
      avatar: "https://img.freepik.com/free-icon/robot_318-413097.jpg",
      text: "Hello! Use the water level and soil moisture sensors in Crops Armor. The system will notify you when the moisture level is low, helping you schedule irrigation efficiently.",
      type: "bot",
      messageType: "text",
      reactions: { like: 2 },
    },
    {
      id: 3,
      user: "You",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      text: "Here's a picture of my tomato crops. They're under attack by insects, can you help?",
      type: "self",
      messageType: "text",
      reactions: { like: 0 },
    },
    {
      id: 4,
      user: "You",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HZ48XAINPXsI_GENlF_f3If2BAcri4J4BQ&s",
      type: "self",
      messageType: "image",
      reactions: { like: 0 },
    },
    {
      id: 5,
      user: "AgroBot",
      avatar: "https://img.freepik.com/free-icon/robot_318-413097.jpg",
      text: "Based on the image, it looks like a common pest attack. Use neem oil spray or biological pest control to mitigate the issue.",
      type: "bot",
      messageType: "text",
      reactions: { like: 3 },
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddMessage = () => {
    if (newMessage.trim() === "" && !selectedImage) return;

    const newEntry = {
      id: messages.length + 1,
      user: "You",
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid", // Placeholder avatar for current user
      text: newMessage,
      type: "self",
      messageType: selectedImage ? "image" : "text",
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : null,
      reactions: { like: 0 },
    };

    setMessages([...messages, newEntry]);
    setNewMessage("");
    setSelectedImage(null); // Reset the image after sending
  };

  const handleReaction = (id) => {
    const updatedMessages = messages.map((message) =>
      message.id === id
        ? { ...message, reactions: { like: message.reactions.like + 1 } }
        : message
    );
    setMessages(updatedMessages);
  };

  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
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
                {message.messageType === "text" ? (
                  <p>{message.text}</p>
                ) : (
                  <img
                    src={message.imageUrl}
                    alt="Uploaded content"
                    className="uploadedImage"
                  />
                )}
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

          <label htmlFor="file-upload" className="uploadLabel">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/image.png"
              alt="Upload icon"
              className="icon"
            />
            Upload Image
          </label>
          <input id="file-upload" type="file" onChange={handleImageUpload} />

          <button
            onClick={handleAddMessage}
            className="sendButton"
            disabled={!newMessage.trim() && !selectedImage}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default AgroBot;

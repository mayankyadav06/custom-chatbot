// Import necessary modules 
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


function App() {
  // Initialize state variables for the user's message and the chat history
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState([]);

  // Create a Ref to enable auto-scrolling
  const messagesEndRef = useRef(null);

  // Define a function to scroll to the bottom of the messages list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Use an effect hook to start the chat when the component mounts
  useEffect(() => {
    startChat();
  }, []);

  // Use an effect hook to scroll to the bottom of the messages list whenever it updates
  useEffect(scrollToBottom, [response]);


  const sendMessage = async () => {
    // Don't send the message if it's empty or only contains whitespace
    if (message.trim() === "") {
      return;
    }
    try {
      // Send a POST request to the server with the message
      const res = await axios.post("http://127.0.0.1:5000/chat", { message });

      // Update the chat history 
      setResponse((prevResponse) => [
        ...prevResponse,
        { text: message, sender: "user" },
        { text: res.data.response, sender: "bot" },
      ]);

      setMessage("");
    } catch (err) {
      // Log any errors to the console
      console.error(err);
    }
  };


  const startChat = async () => {
    try {
      // Send a GET request to the server to start the chat
      const res = await axios.get("http://127.0.0.1:5000/start");

      // Set the first message for chat
      setResponse([{ text: res.data.response, sender: "bot" }]);
    } catch (err) {
      // Log any errors to the console
      console.error(err);
    }
  };

  // Render the chat interface
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "375px",
          overflow: "auto",
          padding: "10px",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {response.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: item.sender === "bot" ? "flex-start" : "flex-end",
              margin: "10px",
            }}
          >
            <div style={{ fontSize: "0.8em", color: "#888" }}>
              {item.sender.toUpperCase()}
            </div>
            <div
              style={{
                maxWidth: "80%",
                borderRadius: "15px",
                padding: "10px",
                backgroundColor: item.sender === "bot" ? "#eee" : "#0084ff",
                color: item.sender === "bot" ? "black" : "white",
              }}
            >
              {item.sender === "bot" && Array.isArray(item.text)
                ? item.text.map((course, i) => (
                    <div key={i} style={{ marginBottom: "10px" }}>
                      <div>
                        <strong>Title:</strong> {course.title}
                      </div>
                      <div>
                        <strong>Description:</strong> {course.description}
                      </div>
                      <div>
                        <strong>Lessons:</strong> {course.lessons}
                      </div>
                      <div>
                        <strong>Price per session:</strong>{" "}
                        {course.price_per_session}
                      </div>
                      {i === item.text.length - 1 && (
                        <div>
                          For more information and for enrolling, contact
                          support.
                        </div>
                      )}
                    </div>
                  ))
                : item.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          borderTop: "1px solid #ccc",
          width: "100%",
          maxWidth: "375px",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            flex: 1,
            marginRight: "10px",
            borderRadius: "15px",
            border: "none",
            padding: "10px",
            backgroundColor: "#eee",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            borderRadius: "15px",
            border: "none",
            padding: "10px 20px",
            backgroundColor: "#0084ff",
            color: "white",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;

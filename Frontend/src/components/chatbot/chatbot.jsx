import { useState, useEffect, useRef } from "react";
import ChatbotIcon from "./chatButton";
import ChatMessage from "./chatMessages";
import ChatForm from "./chatform";
import PropTypes from 'prop-types';

function Chatbot({ closeBot }) {
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef(null); // Reference to the chat body

  // Function to auto-scroll to the bottom
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  // Trigger scroll to bottom when chatHistory changes
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>

          {/* Close Button */}
          <button className="material-symbols-rounded" onClick={closeBot}>
            <span className="material-symbols-outlined">keyboard_arrow_down</span>
          </button>
        </div>

        {/* Chat Body */}
        <div className="chat-body" ref={chatBodyRef} style={{ overflowY: "auto", maxHeight: "300px" }}>
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there 👋 <br /> How can I help you today?
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chat Footer */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} />
        </div>
      </div>
    </div>
  );
}

Chatbot.propTypes = {
  closeBot: PropTypes.func.isRequired,  // Add closeBot as a required function
};

export default Chatbot;

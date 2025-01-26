import ChatbotIcon from "./chatButton";
import PropTypes from 'prop-types';
const ChatMessage = ({ chat }) => {
  const messageClass = `message ${chat.role === "model" ? "bot" : "user"}-message`; // Corrected typos

  return (
    <div className={messageClass}>
      {chat.role === "model" && <ChatbotIcon />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};


ChatMessage.propTypes = {
    chat: PropTypes.shape({
        role: PropTypes.oneOf(['user', 'model']).isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
};
export default ChatMessage;
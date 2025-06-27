import React from "react"

const TypingIndicator: React.FC = () => {
  return (
    <div className="message bot-message">
      <div className="message-avatar">
        <div className="bot-avatar">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7 3.5a.5.5 0 0 1 1 0v3.793l2.146-2.147a.5.5 0 0 1 .708.708L8.707 8l2.147 2.146a.5.5 0 0 1-.708.708L8 8.707V12.5a.5.5 0 0 1-1 0V8.707L4.854 10.854a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293V3.5z" />
          </svg>
        </div>
      </div>
      <div className="message-content">
        <div className="message-bubble typing-bubble">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator

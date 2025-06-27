"use client"

import React from "react"

interface ChatHeaderProps {
  onClearChat?: () => void
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat }) => {
  return (
    <div className="chat-header">
      <div className="header-content">
        <div className="header-left">
          <div className="bot-avatar-header">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" className="avatar-gradient">
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7 3.5a.5.5 0 0 1 1 0v3.793l2.146-2.147a.5.5 0 0 1 .708.708L8.707 8l2.147 2.146a.5.5 0 0 1-.708.708L8 8.707V12.5a.5.5 0 0 1-1 0V8.707L4.854 10.854a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293V3.5z" />
            </svg>
          </div>
          <div className="header-info">
            <h1>Sysco Build Assist</h1>
            <p className="header-subtitle">AI-powered coding companion</p>
          </div>
        </div>
        <div className="header-actions">
          {onClearChat && (
            <button className="action-btn" onClick={onClearChat} title="Clear chat">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatHeader

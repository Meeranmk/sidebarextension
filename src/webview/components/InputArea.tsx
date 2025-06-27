"use client"

import React from "react"

interface InputAreaProps {
  input: string
  setInput: (value: string) => void
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
  isLoading: boolean
}

export const InputArea: React.FC<InputAreaProps> = ({ input, setInput, onSend, onKeyPress, isLoading }) => {
  return (
    <div className="input-area">
      <div className="input-container">
        <textarea
          className="message-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Ask Sysco Build Assist a question or type / for commands"
          rows={1}
          disabled={isLoading}
        />
        <button
          className={`send-button ${!input.trim() || isLoading ? "disabled" : ""}`}
          onClick={onSend}
          disabled={!input.trim() || isLoading}
          title="Send message"
        >
          {isLoading ? (
            <div className="loading-spinner">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 0 1 8 8 .5.5 0 0 1-1 0 7 7 0 1 0-7 7 .5.5 0 0 1 0 1A8 8 0 0 1 8 0z" />
              </svg>
            </div>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M15.854.146a.5.5 0 0 1 .11.54L13.026 8.74a.5.5 0 0 1-.708.708L4.26 2.026a.5.5 0 0 1 .54-.854l8.5 1.5a.5.5 0 0 1 .708.708L8.74 13.026a.5.5 0 0 1-.854-.54l1.5-8.5z" />
            </svg>
          )}
        </button>
      </div>
      <div className="input-footer">
        <span className="input-hint">Press Enter to send, Shift+Enter for new line</span>
      </div>
    </div>
  )
}

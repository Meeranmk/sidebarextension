

import React from "react"
import { useRef } from "react"

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  onSend: () => void
  onFileUpload: (files: File[]) => void
  isLoading: boolean
  hasFiles: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, onSend, onFileUpload, isLoading, hasFiles }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      onFileUpload(files)
    }
  }

  return (
    <div className="chat-input-container">
      <div className="input-wrapper">
        <div className="input-actions">
          <button
            className="action-button"
            onClick={() => fileInputRef.current?.click()}
            title="Attach files or zip folders"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            style={{ display: "none" }}
            accept="*/*,.zip"
          />
        </div>

        <textarea
          className="message-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            hasFiles
              ? "Ask AI Assistant about your files..."
              : "Ask AI Assistant a question or upload zip folders"
          }
          rows={1}
          disabled={isLoading}
        />

        <button
          className={`send-button ${(!input.trim() && !hasFiles) || isLoading ? "disabled" : ""}`}
          onClick={onSend}
          disabled={(!input.trim() && !hasFiles) || isLoading}
          title="Send message"
        >
          {isLoading ? (
            <div className="loading-spinner">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 0 1 8 8 .5.5 0 0 1-1 0 7 7 0 1 0-7 7 .5.5 0 0 1 0 1A8 8 0 0 1 8 0z" />
              </svg>
            </div>
          ) : (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M15.854.146a.5.5 0 0 1 .11.54L13.026 8.74a.5.5 0 0 1-.708.708L4.26 2.026a.5.5 0 0 1 .54-.854l8.5 1.5a.5.5 0 0 1 .708.708L8.74 13.026a.5.5 0 0 1-.854-.54l1.5-8.5z" />
            </svg>
          )}
        </button>
      </div>

      <div className="input-footer">
        <span className="input-hint">Press Enter to send, Shift+Enter for new line • Supports zip folders</span>
      </div>
    </div>
  )
}

export default ChatInput;

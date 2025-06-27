import React from "react"
import type { Message } from "../types"
import FilePreview from "./FilePreview"
import ZipFolderPreview from "./ZipFolderPreview"

interface MessageBubbleProps {
  message: Message
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formatText = (text: string) => {
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g
    const inlineCodeRegex = /`([^`]+)`/g

    let formattedText = text

    formattedText = formattedText.replace(codeBlockRegex, (match, language, code) => {
      return `<div class="code-block">
        <div class="code-header">
          <span class="code-language">${language || "text"}</span>
          <button class="copy-btn" onclick="navigator.clipboard.writeText('${code.replace(/'/g, "\\'")}')">
            Copy
          </button>
        </div>
        <pre class="code-content"><code>${code}</code></pre>
      </div>`
    })

    formattedText = formattedText.replace(inlineCodeRegex, '<code class="inline-code">$1</code>')

    return formattedText
  }

  return (
    <div className={`message ${message.isUser ? "user-message" : "bot-message"}`}>
      <div className="message-avatar">
        <div className={message.isUser ? "user-avatar" : ""}>
          {message.isUser ? (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7 3.5a.5.5 0 0 1 1 0v3.793l2.146-2.147a.5.5 0 0 1 .708.708L8.707 8l2.147 2.146a.5.5 0 0 1-.708.708L8 8.707V12.5a.5.5 0 0 1-1 0V8.707L4.854 10.854a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293V3.5z" />
            </svg>
          )}
        </div>
      </div>
      <div className="message-content">
        <div className="message-bubble">
          <div className="message-text" dangerouslySetInnerHTML={{ __html: formatText(message.text) }} />
          {message.files && message.files.length > 0 && (
            <div className="message-files">
              {message.files.map((file, index) =>
                file.isZip ? <ZipFolderPreview key={index} file={file} /> : <FilePreview key={index} file={file} />,
              )}
            </div>
          )}
        </div>
        <div className="message-time">
          {message.timestamp?.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble

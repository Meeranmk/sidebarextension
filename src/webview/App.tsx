"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import type { Message, WebviewMessage, FileItem } from "./types"
import ChatHeader from "./components/ChatHeader"
import MessageList from "./components/MessageList"
import ChatInput from "./components/ChatInput"
import FileUploadArea from "./components/FileUploadArea"
import { extractZipFile } from "./utils/zipExtractor"
import "./styles.css"

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. You can chat with me or upload files/zip folders for analysis. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isProcessingZip, setIsProcessingZip] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message: WebviewMessage = event.data
      if (message.command === "receiveMessage") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: message.text,
            isUser: false,
            timestamp: new Date(),
          },
        ])
        setIsLoading(false)
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if ((input.trim() || uploadedFiles.length > 0) && !isLoading) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: input || "Uploaded files for analysis",
        isUser: true,
        timestamp: new Date(),
        files: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      // Simulate AI response with specific message for zip files
      setTimeout(() => {
        let responseText = ""

        if (uploadedFiles.length > 0) {
          const hasZipFiles = uploadedFiles.some((file) => file.isZip)

          if (hasZipFiles) {
            const zipFiles = uploadedFiles.filter((file) => file.isZip)
            const regularFiles = uploadedFiles.filter((file) => !file.isZip)

            responseText = `✅ **Files successfully uploaded and ready to migrate!**

**Zip folders processed:** ${zipFiles.length}
${zipFiles.map((file) => `• ${file.name} (${file.extractedFiles?.length || 0} files extracted)`).join("\n")}

${
  regularFiles.length > 0
    ? `**Additional files:** ${regularFiles.length}
${regularFiles.map((file) => `• ${file.name}`).join("\n")}

`
    : ""
}Your project structure has been analyzed and is now ready for migration. I can help you with:
• Code analysis and optimization
• Framework migration assistance  
• Dependency management
• File structure recommendations

What would you like to do next?`
          } else {
            responseText = `I can see you've uploaded ${uploadedFiles.length} file(s): ${uploadedFiles.map((f) => f.name).join(", ")}. Let me analyze them for you.`
          }
        } else {
          responseText = `Thanks for your message: "${input}". This is a simulated response from the AI assistant.`
        }

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: responseText,
            isUser: false,
            timestamp: new Date(),
          },
        ])
        setIsLoading(false)
      }, 1500)

      setInput("")
      setUploadedFiles([])
    }
  }

  const handleFileUpload = async (files: File[]) => {
    setIsProcessingZip(true)
    const newFiles: FileItem[] = []

    for (const file of files) {
      if (file.name.toLowerCase().endsWith(".zip")) {
        try {
          const extractedFiles = await extractZipFile(file)
          newFiles.push({
            name: file.name,
            size: file.size,
            type: "application/zip",
            isZip: true,
            extractedFiles,
            file,
          })
        } catch (error) {
          console.error("Error extracting zip:", error)
          newFiles.push({
            name: file.name,
            size: file.size,
            type: file.type,
            file,
          })
        }
      } else {
        newFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          file,
        })
      }
    }

    setUploadedFiles((prev) => [...prev, ...newFiles])
    setIsProcessingZip(false)
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }

  return (
    <div
      className={`chat-container ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <ChatHeader />
      <MessageList messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />
      {(uploadedFiles.length > 0 || isProcessingZip) && (
        <FileUploadArea files={uploadedFiles} onRemoveFile={handleRemoveFile} isProcessing={isProcessingZip} />
      )}
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        onFileUpload={handleFileUpload}
        isLoading={isLoading}
        hasFiles={uploadedFiles.length > 0}
      />
      {isDragOver && (
        <div className="drag-overlay">
          <div className="drag-content">
            <div className="drag-icon">📁</div>
            <h3>Drop files or zip folders here</h3>
            <p>Zip files will be automatically extracted</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

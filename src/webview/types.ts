export interface ExtractedFile {
    name: string
    path: string
    size: number
    type: string
    content?: string | ArrayBuffer
    isDirectory: boolean
  }
  
  export interface FileItem {
    name: string
    size: number
    type: string
    file: File
    isZip?: boolean
    extractedFiles?: ExtractedFile[]
  }
  
  export interface Message {
    id: string
    text: string
    isUser: boolean
    timestamp?: Date
    files?: FileItem[]
    isError?: boolean
  }
  
  export interface WebviewMessage {
    command: string
    text: string
  }
  
  export interface ChatMessage {
    role: "user" | "assistant"
    text: string
  }
  


import React from "react"
import { useState } from "react"
import type { FileItem, ExtractedFile } from "../types"

interface ZipFolderPreviewProps {
  file: FileItem
}

const ZipFolderPreview: React.FC<ZipFolderPreviewProps> = ({ file }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  const getFileIcon = (type: string, isDirectory: boolean) => {
    if (isDirectory) {
      return (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="folder-icon">
          <path d="M.54 3.87L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h4.672a2 2 0 0 1 2 2l-.04.87a1.99 1.99 0 0 1-.342 1.311l-1.446 2.169a1 1 0 0 1-.831.449H2.159a1 1 0 0 1-.831-.449L-.118 6.181A1.99 1.99 0 0 1 .54 3.87z" />
        </svg>
      )
    }

    if (type.includes("javascript") || type.includes("typescript")) {
      return (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ color: "#f7df1e" }}>
          <path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0h-11z" />
        </svg>
      )
    }

    return (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0z" />
      </svg>
    )
  }

  const renderFileTree = (files: ExtractedFile[], level = 0) => {
    const directories = files.filter((f) => f.isDirectory).sort((a, b) => a.name.localeCompare(b.name))
    const regularFiles = files.filter((f) => !f.isDirectory).sort((a, b) => a.name.localeCompare(b.name))

    return (
      <>
        {directories.map((dir, index) => (
          <div key={`dir-${index}`} className="zip-file-item" style={{ marginLeft: `${level * 12}px` }}>
            <div className="zip-file-icon">{getFileIcon(dir.type, dir.isDirectory)}</div>
            <span className="zip-file-name">{dir.name}</span>
          </div>
        ))}
        {regularFiles.map((file, index) => (
          <div key={`file-${index}`} className="zip-file-item" style={{ marginLeft: `${level * 12}px` }}>
            <div className="zip-file-icon">{getFileIcon(file.type, file.isDirectory)}</div>
            <span className="zip-file-name">{file.name}</span>
            <span className="zip-file-size">{formatFileSize(file.size)}</span>
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="zip-folder">
      <div className="zip-folder-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className={`folder-toggle ${isExpanded ? "expanded" : ""}`}>
          <svg width="8" height="8" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 12.796V3.204L11.481 8 6 12.796z" />
          </svg>
        </div>
        <div className="file-icon">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ color: "#ff6b35" }}>
            <path d="M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V7.5z" />
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
          </svg>
        </div>
        <div className="file-info">
          <div className="file-name">{file.name}</div>
          <div className="file-size">{formatFileSize(file.size)}</div>
        </div>
      </div>

      {isExpanded && file.extractedFiles && (
        <div className="zip-folder-content">{renderFileTree(file.extractedFiles)}</div>
      )}
    </div>
  )
}

export default ZipFolderPreview

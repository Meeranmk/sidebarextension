

import React from "react"
import FilePreview from "./FilePreview"
import ZipFolderPreview from "./ZipFolderPreview"
import type { FileItem } from "../types"

interface FileUploadAreaProps {
  files: FileItem[]
  onRemoveFile: (index: number) => void
  isProcessing?: boolean
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ files, onRemoveFile, isProcessing }) => {
  return (
    <div className="file-upload-area">
      <div className="file-upload-header">
        <h4>Attached Files</h4>
        <span className="file-count-badge">{files.length}</span>
      </div>

      {isProcessing && (
        <div className="processing-indicator">
          <div className="processing-spinner">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 0 1 8 8 .5.5 0 0 1-1 0 7 7 0 1 0-7 7 .5.5 0 0 1 0 1A8 8 0 0 1 8 0z" />
            </svg>
          </div>
          Processing zip files...
        </div>
      )}

      <div className="file-list">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            {file.isZip ? <ZipFolderPreview file={file} /> : <FilePreview file={file} />}
            <button className="remove-file-btn" onClick={() => onRemoveFile(index)} title="Remove file">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileUploadArea

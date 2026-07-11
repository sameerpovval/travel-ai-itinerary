import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaTimes, FaFileAlt } from "react-icons/fa";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { IoImage } from "react-icons/io5";

function UploadCard({ file, setFile, handleUpload, loading }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const isImage = file && file.type.startsWith("image/");
  const isPdf = file && file.type === "application/pdf";

  const previewUrl = isImage ? URL.createObjectURL(file) : null;

  const formatSize = (bytes) => {
    if (!bytes) return "";
    const kb = bytes / 1024;
    return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb.toFixed(0)} KB`;
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="card upload-card shadow-lg border-0">
      <div className="card-body p-5">

        {!file ? (

          <div
            className={`dropzone ${isDragging ? "dropzone-active" : ""}`}
            onClick={() => inputRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
          >
            <FaCloudUploadAlt size={56} className="text-primary mb-3" />
            <h5 className="fw-bold mb-1">
              Drag & drop your file here
            </h5>
            <p className="text-muted mb-3">or click to browse</p>

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />

            <div className="d-flex justify-content-center gap-4 format-badges">
              <span><MdOutlinePictureAsPdf /> PDF</span>
              <span><IoImage /> JPG</span>
              <span><IoImage /> PNG</span>
            </div>
          </div>

        ) : (

          <div className="file-preview">

            <button
              className="file-preview-remove"
              onClick={() => setFile(null)}
              aria-label="Remove file"
            >
              <FaTimes />
            </button>

            {isImage ? (
              <img src={previewUrl} alt="Preview" className="file-preview-img" />
            ) : (
              <div className="file-preview-icon">
                {isPdf ? <MdOutlinePictureAsPdf /> : <FaFileAlt />}
              </div>
            )}

            <div className="file-preview-name">{file.name}</div>
            <div className="file-preview-size">{formatSize(file.size)}</div>

          </div>

        )}

        <button
          className="btn btn-primary btn-lg w-100 mt-4"
          onClick={handleUpload}
          disabled={loading || !file}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Generating your itinerary...
            </>
          ) : (
            "✨ Generate Itinerary"
          )}
        </button>

      </div>
    </div>
  );
}

export default UploadCard;
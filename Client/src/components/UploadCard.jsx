function UploadCard({
  file,
  setFile,
  handleUpload,
  loading,
}) {
  return (
    <div className="card upload-card shadow-sm mb-4">
      <div className="card-body">

        <h3 className="mb-3">
          📄 Upload Travel Document
        </h3>

        <p className="text-muted">
          Upload a PDF or image of your travel booking.
        </p>

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <button
          className="btn btn-dark generate-btn"
          onClick={handleUpload}
        >
          {loading
            ? "Generating..."
            : "✨ Generate AI Itinerary"}
        </button>

      </div>
    </div>
  );
}

export default UploadCard;
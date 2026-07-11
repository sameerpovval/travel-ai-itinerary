import {
  FaPlaneDeparture,
  FaCopy,
  FaWhatsapp,
  FaFilePdf,
} from "react-icons/fa";

import generatePDF from "../utils/pdfGenerator";

function ItineraryCard({
  title,
  itinerary,
  copyItinerary,
  shareWhatsApp,
}) {
  return (
    <div className="card itinerary-card shadow-sm border-0 h-100">

      <div className="card-header bg-white border-0 py-3">

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

          <div className="d-flex align-items-center gap-3">

            <div className="itinerary-icon">
              <FaPlaneDeparture size={20} />
            </div>

            <div>
              <h4 className="mb-0 fw-bold">{title}</h4>
              <small className="text-muted">
                AI Generated Travel Plan
              </small>
            </div>
          </div>

          <div className="d-flex gap-2 itinerary-actions">

            <button
              className="btn btn-light btn-sm border"
              onClick={copyItinerary}
              title="Copy itinerary"
            >
              <FaCopy className="me-1" />
              Copy
            </button>

            <button
              className="btn btn-success btn-sm"
              onClick={shareWhatsApp}
              title="Share on WhatsApp"
            >
              <FaWhatsapp className="me-1" />
              Share
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                generatePDF({
                  title,
                  itinerary,
                  createdAt: new Date(),
                })
              }
              title="Download as PDF"
            >
              <FaFilePdf className="me-1" />
              PDF
            </button>

          </div>

        </div>

      </div>

      <div className="card-body">
        <div className="itinerary-box">
          <pre className="itinerary-text">{itinerary}</pre>
        </div>
      </div>

    </div>
  );
}

export default ItineraryCard;
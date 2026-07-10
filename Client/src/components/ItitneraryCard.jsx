import generatePDF from "../utils/pdfGenerator";

function ItineraryCard({
  title,
  renameTrip,
  itinerary,
  copyItinerary,
  shareWhatsApp,
}) {
  return (
    <div className="card itinerary-card shadow-sm h-100">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center">

          <div className="d-flex align-items-center gap-2">

            <h4 className="mb-0">
              ✈ {title}
            </h4>

            <button
              className="btn btn-outline-warning btn-sm"
              onClick={renameTrip}
            >
              ✏
            </button>

          </div>

          <div>

            <button
              className="btn btn-success btn-sm me-2"
              onClick={copyItinerary}
            >
              📋 Copy
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={shareWhatsApp}
            >
              📱 WhatsApp
            </button>

            <button
               className="btn btn-danger ms-2 btn-sm me-2"
                onClick={() => generatePDF({
                title,
                itinerary,
                createdAt: new Date(),
            })}
>
              📄 PDF
            </button>

          </div>

        </div>

        <hr />

        <div className="itinerary-box">

          <pre
            style={{
              whiteSpace: "pre-wrap",
            }}
          >
            {itinerary}
          </pre>

        </div>

      </div>

    </div>
  );
}

export default ItineraryCard;
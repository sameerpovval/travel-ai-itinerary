import {
  FaPlaneDeparture,
  FaCalendarAlt,
  FaPen,
} from "react-icons/fa";

function TripHeader({
  trip,
  renameTrip,
}) {
  return (
    <div className="card shadow-sm border-0 mb-4 trip-header-card">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center flex-wrap">

          <div>

            <div className="d-flex align-items-center gap-2 mb-2">

              <FaPlaneDeparture
                className="text-primary fs-3"
              />

              <h2 className="fw-bold mb-0">
                {trip.title}
              </h2>

            </div>

            <p className="text-muted mb-0 d-flex align-items-center gap-2">

              <FaCalendarAlt />

              {new Date(
                trip.createdAt
              ).toLocaleDateString()}

            </p>

          </div>

          <button
            className="btn btn-outline-primary mt-3 mt-lg-0"
            onClick={renameTrip}
          >

            <FaPen className="me-2" />

            Rename Trip

          </button>

        </div>

      </div>

    </div>
  );
}

export default TripHeader;
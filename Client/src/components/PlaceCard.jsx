import {
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaCompass,
} from "react-icons/fa";

function PlacesCard({
  places,
  placesLoading,
  openGoogleMap,
}) {
  return (
    <div className="card place-card shadow-sm border-0 h-100">

      <div className="card-header bg-white border-0 py-3">

        <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">

          <FaCompass className="text-success" />

          Places to Explore

        </h5>

      </div>

      <div className="card-body">

        {placesLoading ? (

          <div className="text-center py-5">

            <div
              className="spinner-border text-success"
            />

            <p className="mt-3 text-muted">
              Finding amazing places...
            </p>

          </div>

        ) : (

          <div className="place-list">

            {places.map((place, index) => (

              <div
                key={index}
                className="place-item"
                onClick={() => openGoogleMap(place)}
              >

                <div className="d-flex align-items-center gap-3">

                  <div className="place-icon">

                    <FaMapMarkerAlt />

                  </div>

                  <div>

                    <h6 className="mb-1">

                      {place}

                    </h6>

                    <small className="text-muted">

                      Open in Google Maps

                    </small>

                  </div>

                </div>

                <FaExternalLinkAlt
                  className="text-secondary"
                />

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default PlacesCard;
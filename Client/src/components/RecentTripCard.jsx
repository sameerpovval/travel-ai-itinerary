import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function RecentTripCard({ trip }) {
    return (
        <div className="card recent-card shadow-sm border-0 mb-3">
            
            <div className="card-body d-flex justify-content-between align-items-center">

                <div>

                    <h6 className="fw-bold mb-1">
                        ✈ {trip.title}
                    </h6>

                    <small className="text-muted">
                        {new Date(
                            trip.createdAt
                        ).toLocaleDateString()}
                    </small>

                </div>

                <Link
                    to={`/itinerary/${trip._id}`}
                    className="btn btn-outline-primary btn-sm"
                >
                    <FaArrowRight />
                </Link>

            </div>

        </div>
    );
}

export default RecentTripCard;
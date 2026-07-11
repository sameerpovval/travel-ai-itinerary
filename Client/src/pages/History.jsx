import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import {
  FaPlaneDeparture,
  FaEye,
  FaTrash,
  FaCalendarAlt,
  FaSearch,
  FaSuitcaseRolling,
} from "react-icons/fa";

import "../styles/history.css";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/itinerary/history");
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id) => {
    const result = await Swal.fire({
      title: "Delete itinerary?",
      text: "You won't be able to recover it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/itinerary/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
      Swal.fire("Deleted!", "Trip removed successfully.", "success");
    } catch {
      Swal.fire("Oops", "Delete failed", "error");
    }
  };

  const filteredHistory = history.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="container">

        {/* Header */}

        <div className="history-header d-flex justify-content-between align-items-center flex-wrap gap-3">

          <div>
            <h2 className="fw-bold mb-1">
              <FaSuitcaseRolling className="me-2 text-primary" />
              My Travel Itineraries
            </h2>
            <p className="text-muted mb-0">
              View, manage and revisit your AI generated trips.
            </p>
          </div>

          <span className="history-count-badge">
            {history.length} {history.length === 1 ? "Trip" : "Trips"}
          </span>

        </div>

        {/* Search */}

        <div className="history-search-wrapper mb-4">
          <input
            className="form-control history-search"
            placeholder="Search by trip name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading */}

        {loading && (
          <div className="history-grid">
            {[1, 2, 3].map((i) => (
              <div className="history-skeleton" key={i}>
                <div className="skeleton-line w-60"></div>
                <div className="skeleton-line w-40"></div>
                <div className="skeleton-line w-100 mt-3"></div>
                <div className="skeleton-line w-80"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}

        {!loading && filteredHistory.length === 0 && (
          <div className="card border-0 shadow-sm">
            <div className="empty-history">
              <FaPlaneDeparture />
              <h3>{search ? "No trips match your search" : "No Trips Found"}</h3>
              <p className="text-muted mb-4">
                {search
                  ? "Try a different keyword."
                  : "Upload a ticket and generate your first AI itinerary."}
              </p>
              {!search && (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/upload")}
                >
                  Upload a Document
                </button>
              )}
            </div>
          </div>
        )}

        {/* Cards */}

        {!loading && filteredHistory.length > 0 && (
          <div className="history-grid">
            {filteredHistory.map((item) => (
              <div
                className="history-card"
                key={item._id}
                onClick={() => navigate(`/itinerary/${item._id}`)}
              >
                <div className="history-card-top">
                  <div className="history-card-icon">
                    <FaPlaneDeparture />
                  </div>

                  <div className="history-card-actions">
                    <button
                      className="action-btn action-btn-view"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/itinerary/${item._id}`);
                      }}
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="action-btn action-btn-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTrip(item._id);
                      }}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <h5 className="history-card-title">{item.title}</h5>

                <small className="history-card-date">
                  <FaCalendarAlt className="me-2" />
                  {new Date(item.createdAt).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </small>

                <p className="history-card-preview">
                  {item.travelData.substring(0, 140)}...
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
}

export default History;
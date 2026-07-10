import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/itinerary/history");
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTrip = async (id) => {

    const result = await Swal.fire({
      title: "Delete Itinerary?",
      text: "You won't be able to recover it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {

      await api.delete(`/itinerary/${id}`);

      setHistory((prev) =>
        prev.filter((trip) => trip._id !== id)
      );

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your itinerary has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Delete failed.",
      });

    }
  };

  const filteredHistory = history.filter((trip) =>
    trip.travelData.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>

      <div className="container">

        <div className="card shadow-lg border-0">

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>
                <h2 className="fw-bold mb-1">
                  🧳 My Itineraries
                </h2>

                <p className="text-muted mb-0">
                  Manage all your AI-generated trips
                </p>
              </div>

              <span className="badge bg-dark fs-6">
                {history.length} Trips
              </span>

            </div>

            <input
              className="form-control mb-4"
              placeholder="🔍 Search itinerary..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="row">

              {filteredHistory.map((item) => (

                <div className="col-lg-6 mb-4" key={item._id}>

                  <div className="card border-0 shadow-sm h-100">

                    <div className="card-body">

                      <div className="d-flex justify-content-between">

                        <div>

                          <h5 className="fw-bold">
                            ✈ Travel Itinerary
                          </h5>

                          <small className="text-muted">
                            📅{" "}
                            {new Date(
                              item.createdAt
                            ).toLocaleDateString()}
                          </small>

                        </div>

                        <div className="d-flex gap-2">

                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              navigate(`/itinerary/${item._id}`)
                            }
                          >
                            👁
                          </button>

                          <button
                            className="btn btn-outline-warning btn-sm"
                          >
                            ✏
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => deleteTrip(item._id)}
                          >
                            🗑
                          </button>

                        </div>

                      </div>

                      <hr />

                      <p
                        className="text-muted"
                        style={{
                          minHeight: "80px",
                        }}
                      >
                        {item.travelData.substring(
                          0,
                          140
                        )}
                        ...
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default History;
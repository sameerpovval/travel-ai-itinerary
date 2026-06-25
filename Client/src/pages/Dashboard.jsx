import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Dashboard() {
  const [totalTrips, setTotalTrips] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/itinerary/history");

      setTotalTrips(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5>Total Itineraries</h5>
              <h2>{totalTrips}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5>Uploads</h5>
              <h2>{totalTrips}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5>AI Generated</h5>
              <h2>{totalTrips}</h2>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;
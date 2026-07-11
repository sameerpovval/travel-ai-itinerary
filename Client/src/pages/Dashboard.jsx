import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import StatCard from "../components/StatCard";
import RecentTripCard from "../components/RecentTripCard";
import "../styles/dashboard.css";
import { Link } from "react-router-dom";

import {
  FaPlaneDeparture,
  FaRobot,
  FaWallet,
  FaMapMarkedAlt,
} from "react-icons/fa";

function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/itinerary/history");

      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalTrips = history.length;

  const totalChats = history.reduce(
    (total, trip) =>
      total + (trip.messages?.length || 0),
    0
  );

  const totalBudgets = history.filter(
    (trip) => trip.budget
  ).length;

  const totalPlaces = history.reduce(
    (total, trip) =>
      total + (trip.places?.length || 0),
    0
  );

  const recentTrips = history.slice(0, 3);

  return (
    <Layout>

      <div className="container">

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2 className="fw-bold">
              Welcome Back 👋
            </h2>

            <p className="text-muted mb-0">
              Manage all your AI travel plans in one place.
            </p>

          </div>

        </div>

        {/* Stats */}

        <div className="row g-4 mb-5">

          <div className="col-lg-4 col-md-6">

            <StatCard
              icon={<FaPlaneDeparture />}
              title="Total Trips"
              value={totalTrips}
              color="#0d6efd"
            />

          </div>

          <div className="col-lg-4 col-md-6">

            <StatCard
              icon={<FaRobot />}
              title="AI Chats"
              value={totalChats}
              color="#6610f2"
            />

          </div>

          <div className="col-lg-4 col-md-6">

            <StatCard
              icon={<FaWallet />}
              title="Budgets"
              value={totalBudgets}
              color="#198754"
            />

          </div>

          {/* <div className="col-lg-3 col-md-6">

            <StatCard
              icon={<FaMapMarkedAlt />}
              title="Places"
              value={totalPlaces}
              color="#fd7e14"
            />

          </div> */}

        </div>

        {/* Recent Trips */}

        <div className="card border-0 shadow-sm">

          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h4 className="fw-bold">
                Recent Trips
              </h4>

              <Link
                to="/history"
                className="showmoreLink"
              >
                Show More →
              </Link>

            </div>

            {recentTrips.length === 0 ? (

              <p className="text-muted">
                No trips yet.
              </p>

            ) : (

              recentTrips.map((trip) => (

                <RecentTripCard
                  key={trip._id}
                  trip={trip}
                />

              ))

            )}

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/sidebar.css";

function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged Out Successfully");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div
      className="bg-dark text-white shadow"
      style={{
        width: isOpen ? "250px" : "80px",
        top: 0,
        height: "100vh", position: "fixed",
        left: 0,
        transition: "0.3s",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      <div className="p-3">

        <h4 className="fw-bold text-center mb-4">
          {isOpen ? "✈ Travel AI" : "✈"}
        </h4>

        <div className="d-flex flex-column gap-2">

          <Link
            className="text-white text-decoration-none p-3 rounded"
            style={{ transition: "0.2s" }}
            to="/dashboard"
          >
            <FaHome /> {isOpen && " Dashboard"}
          </Link>

          <Link
            className="text-white text-decoration-none p-3 rounded"
            style={{ transition: "0.2s" }}
            to="/upload"
          >
            <FaUpload /> {isOpen && " Upload"}
          </Link>

          <Link
            className="text-white text-decoration-none p-3 rounded"
            style={{ transition: "0.2s" }}
            to="/history"
          >
            <FaHistory /> {isOpen && " History"}
          </Link>

        </div>

        <div
          className="position-absolute bottom-0 start-0 w-100 p-3"
        >
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger w-100"
          >
            <FaSignOutAlt />
            {isOpen && " Logout"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
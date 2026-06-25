import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

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
      className="bg-dark text-white"
      style={{
        width: isOpen ? "250px" : "80px",
        minHeight: "100vh",
        transition: "0.3s",
        overflow: "hidden",
      }}
    >
      <div className="p-3">
        <h4>{isOpen ? "Travel AI" : "AI"}</h4>

        <div className="d-flex flex-column gap-4 mt-4">

          <Link
            className="text-white text-decoration-none"
            to="/dashboard"
          >
            <FaHome /> {isOpen && " Dashboard"}
          </Link>

          <Link
            className="text-white text-decoration-none"
            to="/upload"
          >
            <FaUpload /> {isOpen && " Upload"}
          </Link>

          <Link
            className="text-white text-decoration-none"
            to="/history"
          >
            <FaHistory /> {isOpen && " History"}
          </Link>

          <button
            onClick={handleLogout}
            className="btn btn-danger"
          >
            <FaSignOutAlt /> {isOpen && " Logout"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default Sidebar;
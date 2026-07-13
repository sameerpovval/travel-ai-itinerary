import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaUserCircle,
  FaSignOutAlt,
  FaUser
} from "react-icons/fa";

import Swal from "sweetalert2";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/upload": "Upload Document",
  "/history": "Trip History",
};

function Navbar({ setIsOpen, isOpen }) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Travel AI";
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const navigate = useNavigate();

  // Re-read user from localStorage whenever Profile page updates it
  useEffect(() => {
    const handleUserUpdated = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userUpdated", handleUserUpdated);
    return () => window.removeEventListener("userUpdated", handleUserUpdated);
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "See you again!",
      timer: 1200,
      showConfirmButton: false,
    });

    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <nav className="app-navbar">

      <div className="d-flex align-items-center gap-3">
        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <span className="navbar-page-title">{title}</span>
      </div>

      <div className="position-relative">

        <div
          className="navbar-user"
          onClick={() => setShowProfile(!showProfile)}
        >
          {user?.profileImage ? (
            <img
              src={`https://travel-ai-itinerary-lnit.onrender.com/${user.profileImage}`}
              alt=""
              className="navbar-avatar-img"
            />
          ) : (
            <FaUserCircle size={30} />
          )}
        </div>

        {showProfile && (
          <div className="profile-dropdown shadow">

            <div className="p-3 d-flex align-items-center gap-3">

              {user?.profileImage ? (
                <img
                  src={`https://travel-ai-itinerary-lnit.onrender.com/${user.profileImage}`}
                  alt=""
                  className="dropdown-avatar-img"
                />
              ) : (
                <FaUserCircle size={38} className="text-secondary" />
              )}

              <div>
                <h6 className="mb-1">{user?.name}</h6>
                <small className="text-muted">{user?.email}</small>
              </div>

            </div>

            <hr className="m-0" />

            <button
              className="dropdown-item d-flex align-items-center gap-2"
              onClick={() => {
                setShowProfile(false);
                navigate("/profile");
              }}
            >
              <FaUser />
              My Profile
            </button>
            <button
              className="dropdown-item text-danger d-flex align-items-center gap-2"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/upload": "Upload Document",
  "/history": "Trip History",
};

function Navbar({ setIsOpen, isOpen }) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Travel AI";

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

      <div className="navbar-user">
        <FaUserCircle size={28} />
      </div>

    </nav>
  );
}

export default Navbar;
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaHistory,
  FaSignOutAlt,
  FaPlane,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/sidebar.css";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: FaHome },
  { to: "/upload", label: "Upload", icon: FaUpload },
  { to: "/history", label: "History", icon: FaHistory },
];

function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-collapsed"}`}>

      <div className="sidebar-logo">
        <div className="sidebar-logo-badge">
          <FaPlane />
        </div>
        {isOpen && <span className="sidebar-title">Travel AI</span>}
      </div>

      {isOpen && <div className="sidebar-section-label">Menu</div>}

      <div className="sidebar-links">
        {links.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`sidebar-link ${active ? "sidebar-link-active" : ""}`}
              title={!isOpen ? label : undefined}
              onClick={closeSidebar}
            >
              <Icon className="sidebar-link-icon" />
              {isOpen && <span>{label}</span>}
            </Link>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <button
          onClick={handleLogout}
          className="sidebar-logout"
          title={!isOpen ? "Logout" : undefined}
        >
          <FaSignOutAlt />
          {isOpen && <span>Logout</span>}
        </button>
      </div>

    </div>
  );
}

export default Sidebar;
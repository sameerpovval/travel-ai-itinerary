import { FaBars } from "react-icons/fa";

function Navbar({ setIsOpen, isOpen }) {
  return (
    <nav className="navbar bg-white shadow-sm px-4">
      <button
        className="btn btn-outline-dark me-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      <span className="navbar-brand mb-0">
        Travel AI Itinerary Generator
      </span>
    </nav>
  );
}

export default Navbar;
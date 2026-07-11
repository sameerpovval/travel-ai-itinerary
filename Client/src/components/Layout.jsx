import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import '../styles/layout.css';

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex">
      <Sidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />

      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className="main-content bg-light min-vh-100"
        style={{
          marginLeft: isOpen && !isMobile ? "250px" : isMobile ? "0" : "80px",
        }}
      >
        <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />

        <div className="container-fluid p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import '../styles/layout.css';

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="d-flex">
      <Sidebar isOpen={isOpen} />

      <div
        className="bg-light min-vh-100"
        style={{
          marginLeft: isOpen ? "250px" : "80px",
          transition: "0.3s",
          width: "100%",
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
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="d-flex">
      <Sidebar isOpen={isOpen} />

      <div className="flex-grow-1 bg-light min-vh-100">
        <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />

        <div className="container-fluid p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
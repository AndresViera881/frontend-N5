import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PermisoPage from "./pages/PermisoPage";
import { InicioPage } from "./pages/InicioPage";

const App: React.FC = () => {
  const sidebarLinks = [
    { label: "Inicio", path: "/" },
    { label: "Permisos", path: "/permisos" },
  ];

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar
          links={sidebarLinks}
          title="Challenge N5"
          isCollapsible={true}
        />
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route path="/permisos" element={<PermisoPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

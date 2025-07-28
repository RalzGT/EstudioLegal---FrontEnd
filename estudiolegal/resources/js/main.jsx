import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Documentos from "./components/documentos";
import Dashboard from "./components/dashborad";
import Carpetas from "./components/carpetas";
import Login from "./components/login";


function Main() {
  return (
    <BrowserRouter>
      <div className="bg-gray-300 w-full min-h-screen grid grid-cols-5 grid-rows-[auto_1fr]">
        <div className="col-span-5 h-[60px] border-b border-gray-300 shadow-md">
          <Navbar />
        </div>
        <div className="row-span-1 row-start-2">
          <Sidebar />
        </div>
        <div className="col-span-4 row-span-1 row-start-2 p-4 overflow-y-auto max-h-[calc(100vh-60px)]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/documentos" element={<Documentos />} />
            <Route path="/carpetas" element={<Carpetas />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default Main;

if (document.getElementById('root')) {
  const Index = ReactDOM.createRoot(document.getElementById("root"));

  Index.render(
    <Main />
  )
}
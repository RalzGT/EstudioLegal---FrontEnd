import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

import Dashboard from "./components/dashborad";
import Carpetas from "./components/carpetas";
import Login from "./components/login";
import Asignar from "./components/asignar";
import Desbanear from "./components/desbanear";
import Casosterminados from "./components/casosterminados";
import Jurisprudencia from "./components/jurisprudencia";


function Main() {
  return (
    // <Login />
    <BrowserRouter>
      <div className="bg-gray-300 w-full h-screen grid grid-cols-5 grid-rows-[auto_1fr]">
        <div className="col-span-5 h-[60px] border-b border-gray-300 shadow-md">
          <Navbar />
        </div>
        <div className="row-span-1 row-start-2">
          <Sidebar />
        </div>
        <div className="col-span-4 row-span-1 row-start-2 p-4 overflow-y-auto max-h-[calc(100vh-60px)]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/carpetas" element={<Carpetas />} />
            <Route path="/casosterminados" element={<Casosterminados />} />
            <Route path="/jurisprudencia" element={<Jurisprudencia />} />
            <Route path="/asignar" element={<Asignar />} />
            <Route path="/desbanear" element={<Desbanear />} />
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
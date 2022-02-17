import React from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

import Patient from './components/pages/Patient';
import Lab from './components/pages/Lab';
import Dashboard from './components/pages/Dashboard';


const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/patient" element={<Patient />} />
        </Routes>
    </BrowserRouter>  
  );
};

export default App;
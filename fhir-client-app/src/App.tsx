import React from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

import Patients from './components/pages/Patients';
// import HomePage from "./components/pages/Home";

const App: React.FC = () => {
  return (
    // <Patients />
    // <BrowserRouter>
    // <Routes>
      <Route path="/sa" element={<Patients />} />
    // </Routes>
  );
};

export default App;
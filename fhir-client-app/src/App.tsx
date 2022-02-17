import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Patients from './components/pages/Patients';
// import HomePage from "./components/pages/Home";

const App: React.FC = () => {
  return (
    <Patients />
    // <Router>
    //     <Route path="/" >
         
    //     </Route>
    // </Router>
  );
};

export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodosContainer from "./components/TodosContainer";
import SignIn from "./components/SignIn";
import SIgnUp from "./components/SIgnUp";
import ProtectedRoute from "./utils/ProtectedRoute";

import "./App.css";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={ <ProtectedRoute><TodosContainer /></ProtectedRoute>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SIgnUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

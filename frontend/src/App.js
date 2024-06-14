import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Login from "./components/Login/index.jsx";
import Signup from "./components/SignUp/index.jsx";
import "./App.css";
import Homepage from "./components/Homepage/index.jsx";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <SwitchTransition>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/home" exact element={<Homepage />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default App;

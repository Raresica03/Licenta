import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Home, Welcome, SignIn, SignUp, Account } from "./pages/index";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;

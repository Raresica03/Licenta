import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import {
  Home,
  Welcome,
  SignIn,
  SignUp,
  Account,
  UserDashboard,
  AdminDashboard,
} from "./pages/index";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-account" element={<Account />} />
        <Route element={<PrivateRoute roles={["User"]} />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
        <Route element={<PrivateRoute roles={["Admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;

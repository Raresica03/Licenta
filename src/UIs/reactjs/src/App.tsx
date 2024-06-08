import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import {
  Home,
  Welcome,
  SignIn,
  SignUp,
  Account,
  StudentDashboard,
  ProfessorDashboard,
  AdminDashboard,
  UniversityList,
  FacultyList,
  BuildingList,
  RoomList,
} from "./pages/index";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";
import ProtectedRoute from "./context/ProtectedRoute";

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
        <Route element={<PrivateRoute roles={["Student"]} />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Route>
        <Route element={<PrivateRoute roles={["Professor"]} />}>
          <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
        </Route>
        <Route element={<PrivateRoute roles={["Admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        <Route
          element={<ProtectedRoute roles={["Admin", "Professor", "Student"]} />}
        >
          <Route path="/universities" element={<UniversityList />} />
          <Route path="/faculties/:universityId" element={<FacultyList />} />
          <Route path="/buildings/:facultyId" element={<BuildingList />} />
          <Route path="/rooms/:buildingId" element={<RoomList />} />
        </Route>
        <Route element={<ProtectedRoute roles={["Admin"]} />}>
          <Route path="/admin/universities" element={<UniversityList />} />
          <Route
            path="/admin/faculties/:universityId"
            element={<FacultyList />}
          />
          <Route
            path="/admin/buildings/:facultyId"
            element={<BuildingList />}
          />
          <Route path="/admin/rooms/:buildingId" element={<RoomList />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;

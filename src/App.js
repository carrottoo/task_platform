import "./App.css";
import React from "react";
import SignUp from "./components/signUp";
import Dashboard from "./components/dashboard";
import HomePage from "./pages/homePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/siginInPage";
import SetProfilePage from "./pages/setProfilePage";
import EmployerMainPage from "./pages/employerMainPage";
import UserProfilePage from "./pages/userProfilePage";
import EmployeeMainPage from "./pages/empolyeeMainPage";
import CreatedTasksPage from "./pages/createdTasksPage";
import AssignedTasksPage from "./pages/assignedTasksPage";
import UnassignedTasksPage from "./pages/unassignedTasksPage";
import ApprovedTasksPage from "./pages/approvedTasksPage";
import SubmittedTasksPage from "./pages/submittedTasksPage";
import CreatedPropertyPage from "./pages/createdPropertyPage";
import InterestedPropertyPage from "./pages/interestedTagsPage";
import UninterestedPropertyPage from "./pages/uninterestedTagsPage";
import CompletedTasksPage from "./pages/completedTasksPage";
import LikedTasksPage from "./pages/LikeTasksPage";
import DislikedTasksPage from "./pages/dislikeTasksPage";
// import NotFound from './components/notFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/set_profile" element={<SetProfilePage />} />
        <Route path="/employer" element={<EmployerMainPage />} />
        <Route path="/employee" element={<EmployeeMainPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/all_created_tasks" element={<CreatedTasksPage />} />
        <Route path="/assigned_tasks" element={<AssignedTasksPage />} />
        <Route path="/unassigned_tasks" element={<UnassignedTasksPage />} />
        <Route path="/approved_tasks" element={<ApprovedTasksPage />} />
        <Route path="/submitted_tasks" element={<SubmittedTasksPage />} />
        <Route path="/completed_tasks" element={<CompletedTasksPage />} />
        <Route path="/liked_tasks" element={<LikedTasksPage />} />
        <Route path="/disliked_tasks" element={<DislikedTasksPage />} />
        <Route
          path="/created_property_tags"
          element={<CreatedPropertyPage />}
        />
        <Route
          path="/interested_property_tags"
          element={<InterestedPropertyPage />}
        />
        <Route
          path="/uninterested_property_tags"
          element={<UninterestedPropertyPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;

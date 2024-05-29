import './App.css';
import React from 'react';
import SignUp from './components/signUp';
import Dashboard from './components/dashboardEmployer';
import DashboardEmployee from './components/dashboardEmployee';
import HomePage from './pages/homePage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignInPage from './pages/siginInPage'; 
import SetProfilePage from './pages/setProfilePage';
import EmployerMainPage from './pages/employerMainPage';
import UserProfilePage from './pages/userProfilePage';
import EmployeeMainPage from './pages/empolyeeMainPage';
import CreatedTasksPage from './pages/createdTasksPage';
import AssignedTasksPage from './pages/assignedTasksPage';
import UnassignedTasksPage from './pages/unassignedTasksPage';
import TasksToReviewPage from './pages/TasksToReviewPage';
import ApprovedTasksPage from './pages/approvedTasksPage';
import CreatedPropertyPage from './pages/createdPropertyPage';
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
        <Route path="/employer/tasks_to_review" element={<TasksToReviewPage />} />
        <Route path="/employer/approved_tasks" element={<ApprovedTasksPage />} />
        <Route path="/created_property_tags" element={<CreatedPropertyPage />} />
      </Routes>
    </Router>
  );
}

export default App;



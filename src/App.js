import './App.css';
import React from 'react';
import SignUp from './components/signUp';
import Dashboard from './components/dashboard';
import DashboardEmployee from './components/dashboardEmployee';
import HomePage from './pages/homePage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignInPage from './pages/siginInPage'; 
import SetProfilePage from './pages/setProfilePage';
import EmployerMainPage from './pages/employerMainPage';
import UserProfilePage from './pages/userProfilePage';
import EmployeeMainPage from './pages/empolyeeMainPage';
import CreatedTasksPage from './pages/createdTasksPage';
// import NotFound from './components/notFound';

function App() {
  return (
    <Router>   
      {/* <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      </nav> */}
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/set_profile" element={<SetProfilePage />} />
        <Route path="/employer" element={<EmployerMainPage />} />
        <Route path="/employee" element={<EmployeeMainPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/employer/created_tasks" element={<CreatedTasksPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
 

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* Including the SignIn component */}
//         <FallingSquares/>
//         <div className="content-container">
//           <h1 className="greeting-text">Welcome To Task Service Platform!</h1>
//         </div>
//         <div className="sign-in-container">
//           <SignIn />
//         </div>
//       </header>
//     </div>
//   );
// }



import './App.css';
import React from 'react';
import SignUp from './components/signUp';
import Dashboard from './components/dashboard';
import DashboardEmployee from './components/dashboardEmployee';
import Header from './components/header';
import HomePage from './pages/homePage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignInPage from './pages/siginInPage'; 
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
        <Route path="/employer" element={<Dashboard />} />
        <Route path="/employee" element={<DashboardEmployee />} />
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



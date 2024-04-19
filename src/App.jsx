
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Instruction from './pages/Instruction';
import QuestionMcq from './pages/QuestionMcq';
import LeaderboardMain from './pages/leaderboard/LeaderboardMain';
import Result from './pages/ResultPg/component/Result'
import OurTeam from './pages/OurTeam';
import Navbar from "./components/Navbar"
import UserContextProvider from '../context/UserContextProvider';
import PrivateRoute from './components/PrivateRoute'
import InstructionMain from './pages/InstrcutionPage/InstructionMain';
import UserContext from '../context/UserContext';
import { useContext , useState,useEffect } from 'react';
import DisableClipboard from './components/DisableClipboard'
import DisableNavigation from './components/DisableNavigation';



// const router = createBrowserRouter(
//   createRoutesFromElements(
   
  
//   )
// )

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [IsAccepted, setIsAccepted] = useState(false);
  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem('isLogin') === 'true';
    const contractAccept = localStorage.getItem('contractAccept') === 'true';
    // console.log("cecking ",userIsLoggedIn);

    setLoggedIn(userIsLoggedIn);
    setIsAccepted(contractAccept);
    const handleKeyDown = (event) => {
      // Prevent opening the console with keyboard shortcuts
      if ((event.ctrlKey && event.shiftKey && (event.key === 'C' || event.key === 'c' || event.key === 'I' || event.key === 'i' || event.key === 'J' || event.key === 'j')) ||
        (event.keyCode === 123) ||  // F12 - Chrome developer tools
        (event.altKey && event.key === 'Tab') ||  // Alt+Tab window switcher
        (event.metaKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown'))  // Windows+Arrow keys for window management
       ) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  // Add event listener to intercept keyboard events
  document.addEventListener('keydown', handleKeyDown);

  // Clean up the event listener on unmount
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, []);   
  
  // let path = router;
  const {currentUser}  = useContext(UserContext);
  // console.log("roter" , path);
  // const login = () => path==="/";
  const [fullScreenToggle,setFullScreenToggle] = useState(false)

  return (
    
    <>
        
      <div className='main h-auto md:h-screen'>
      <Navbar fullScreenToggle={fullScreenToggle} setFullScreenToggle={setFullScreenToggle}/>
    {/* <DisableNavigation> */}
    {/* <DisableClipboard> */}
   <Routes>
   <Route path="/" element={<Login fullScreenToggle={fullScreenToggle} setFullScreenToggle={setFullScreenToggle}/>} />
      <Route path="instruction" element={<InstructionMain />} />
      <Route path="leaderboard" element={<LeaderboardMain/>} />
      <Route element={<PrivateRoute />} >
        <Route path="question" element={<QuestionMcq/>} />
        <Route path="result" element={<Result/>} />
        <Route path="Ourteam" element={<OurTeam/>} />
      </Route>
      {/* <Route path="question" element={<QuestionMcq/>} />
      <Route path="result" element={<Result/>} />
      <Route path="Ourteam" element={<OurTeam/>} /> */}

      
      </Routes>
      {/* </DisableClipboard> */}
      {/* </DisableNavigation> */}
      </div>

      
    </>
  );
}

export default App;


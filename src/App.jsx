
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, Routes } from 'react-router-dom';
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
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent opening the console with keyboard shortcuts
      // if (event.ctrlKey && event.shiftKey && (event.key === 'C' || event.key === 'c') || (event.keyCode === 123) || event.ctrlKey && event.shiftKey && (event.key === 'J' || event.key === 'j')) {
      //   event.preventDefault();
      //   event.stopPropagation();
      // }
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
        
      <div className='main h-screen'>
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


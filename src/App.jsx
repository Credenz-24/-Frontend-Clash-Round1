
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
import { useContext , useState } from 'react';



// const router = createBrowserRouter(
//   createRoutesFromElements(
   
  
//   )
// )

function App() {
  // let path = router;
  const {currentUser}  = useContext(UserContext);
  // console.log("roter" , path);
  // const login = () => path==="/";

  return (
    
    <>
        
      <div className='main'>
    <Navbar/>
   <Routes>
      <Route path="/" element={<Login />} />
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
      </div>

      
    </>
  );
}

export default App;


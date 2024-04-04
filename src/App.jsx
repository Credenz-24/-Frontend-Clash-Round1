
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Instruction from './pages/Instruction';
import QuestionMcq from './pages/QuestionMcq';
import Leaderboard from './pages/Leaderboard';
import Result from './pages/Result';
import OurTeam from './pages/OurTeam';
import Navbar from "./components/Navbar"
import UserContextProvider from '../context/UserContextProvider';



const router = createBrowserRouter(
  createRoutesFromElements(
    <UserContextProvider>
      <>
      <Route path="/" element={<Login />} />
      <Route path="instruction" element={<Instruction />} />
      <Route path="question" element={<QuestionMcq/>} />
      <Route path="leaderboard" element={<Leaderboard/>} />
      <Route path="result" element={<Result/>} />
      <Route path="Ourteam" element={<OurTeam/>} />

      </>
      </UserContextProvider>
  
  )
)

function App({routes}) {

  return (
    <>
      <div className='bg-slate-900'>
      <Navbar></Navbar>
      <RouterProvider router={router}/>
      </div>
    </>
  );
}

export default App;


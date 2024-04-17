import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import UserContext from '../../context/UserContext';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nav, setNav] = useState(true);
  const { setUser } = useContext(UserContext);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    axios
      .get('http://localhost:8000/core/logout/', {
        headers: { Authorization: `${localStorage.getItem('token')}` }
      })
      .then((res) => {
        console.log('logout', res);
        setUser(null);
        localStorage.removeItem('token');
        navigate('/');
      })
      .catch((err) =>
        console.log(err.response ? err.response.data.detail : err.message)
      );
  };

  const isHomeRoute = location.pathname === '/';

  return (
    <div
      className={`navbar h-24 w-full px-[5vw] text-white flex justify-between items-center ${
        isHomeRoute ? 'bg-transparent absolute top-0' : '' // Conditional background color
      }`}
    >
      <div className="nav-left flex justify-center items-center">
      {isHomeRoute ? (null) : (
      <>
      <img src="../clash.png" alt="" className="h-[120px] w-[120px]" />
      </>
      ) // Conditional background color
      }
        
      </div>
      <div className="nav-right text-[17px] font-normal justify-center items-center gap-[20px] hidden md:flex">
      {isHomeRoute ? (
        <>
        <a href="/leaderboard" className="px-[20px] py-[10px] text-center">
          Leaderboards
        </a>
        </>
      ) : (
      <>
        <a href="/instruction" className="px-[20px] py-[10px] text-center">
          Instructions
        </a>
        <a href="/leaderboard" className="px-[20px] py-[10px] text-center">
          Leaderboards
        </a>
        <a
          onClick={() => handleLogout()}
          className="px-[20px] py-[10px] text-center cursor-pointer"
        >
          Logout
        </a>
      </>
      ) // Conditional background color
      }
   
      </div>
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>

      <div
        className={`${
          !nav ? '' : 'hidden'
        } fixed left-0 top-0 w-[60%] h-[100%] bg-zinc-900 z-[9999] translate-x-0 duration-300`}
      >
        <div className="nav-left">
          <h1 className="text-[30px] font-bold px-[19px] mt-[25.1px] ">LOGO.</h1>
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-[40px] py-[25px] uppercase ">
          <a href="/" className="p-4 border-b border-zinc-700 w-full">
            Home
          </a>
          <a href="/leaderboard" className="p-4 border-b border-zinc-700 w-full">
            Leaderboards
          </a>
          <a href="/instruction" className="p-4 border-b border-zinc-700 w-full">
            Instructions
          </a>
          <a
            onClick={() => handleLogout()}
            className="p-4 border-b border-zinc-700 w-full"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

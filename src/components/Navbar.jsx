import React, { useState, useContext } from 'react';
import { useNavigate, useLocation , Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import { toast } from "react-toastify";
import InstructionModal from './InstructionModal'
function Navbar({fullScreenToggle,setFullScreenToggle}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [nav, setNav] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleNav = () => {
    setNav(!nav);
  };
  const handleInstructionsClick = () => {
    setIsModalOpen(true); // Open the modal when "Instructions" is clicked
    if(!nav){
      setNav(!nav);
    }
  };
  const handleLogout = () => {
    axios
      .get('https://api.clash.credenz.in/core/logout/', {
        headers: { Authorization: `${localStorage.getItem('token')}` }
      })
      .then((res) => {
        // console.log('logout', res);
        setUser(null);
        localStorage.clear();
        setFullScreenToggle(true);
        navigate('/');
        window.location.reload();
        toast.info("Logged Out!")
      })
      .catch((err) =>
        {console.log(err.response ? err.response.data.detail : err.message);
        localStorage.clear();
        navigate("/");
        toast.info("Logged Out!")
      }

      );
  };

  const isHomeRoute = location.pathname === '/';
  const isInstructionRoute = location.pathname === '/instruction';
  const isResultRoute = location.pathname === '/result';
  const isQuestionRoute = location.pathname === '/question';

  return (
    <>
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
        {/* <Link to="/leaderboard" className="px-[20px] py-[10px] text-center">
          Leaderboards
        </Link> */}
        </>
      ) : (
      <>
      {isInstructionRoute || isResultRoute ? (null):(
        <button onClick={handleInstructionsClick} className="px-[20px] py-[10px] text-center">
          Instructions
        </button>
      )
    }
    {localStorage.getItem('token')  ? (null):(
        <Link to="/leaderboard" className="px-[20px] py-[10px] text-center">
          Leaderboards
        </Link>
    )}
    {isResultRoute ? (
              <Link to="/leaderboard" className="px-[20px] py-[10px] text-center">
              Leaderboards
            </Link>
    ):(null)
  }
    {/* {console.log(localStorage.getItem('token') !== undefined)} */}
    {localStorage.getItem('token') ? (
              <a
              onClick={() => handleLogout()}
              className="px-[20px] py-[10px] text-center cursor-pointer"
            >
              Logout
            </a>
    ) : (
      <Link to="/" className="px-[20px] py-[10px] text-center">
      Login
    </Link>
    )}

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
          <h1 className="text-[30px] font-bold px-[19px] mt-[25.1px] "><img className='w-20 h-20' src="../clash.svg" alt="" /></h1>
        </div>  
        <div className="flex flex-col justify-start items-start w-full gap-[40px] py-[25px] uppercase ">
        {localStorage.getItem('token') &&
          <a href="/" className="p-4 border-b border-zinc-700 w-full">
            Home
          </a>
        }
          <a href="/leaderboard" className="p-4 border-b border-zinc-700 w-full">
            Leaderboards
          </a>
          <a onClick={handleInstructionsClick} className="p-4 border-b border-zinc-700 w-full">
            Instructions
          </a>
          {localStorage.getItem('token') ? (
              <a
              onClick={() => handleLogout()}
              className="px-[20px] py-[10px] text-center cursor-pointer"
            >
              Logout
            </a>
    ) : (
      <Link to="/" className="px-[20px] py-[10px] text-center">
      Login
    </Link>
    )}
        </div>
      </div>
    </div>
    {isModalOpen && (
        <InstructionModal
          // Pass props to the Modal component as needed
          onClose={() => setIsModalOpen(false)} // Close the modal when the "X" button is clicked
        />
      )}
    </>
  );
}

export default Navbar;

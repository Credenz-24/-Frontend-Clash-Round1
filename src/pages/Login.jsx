import React, { useState, useEffect , useContext,useRef } from "react";
import axios from 'axios';
// import { useForm, SubmitHandler } from "react-hook-form"
import "./Login.css";
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext'
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const [showLabelUser, setShowLabelUser] = useState(false);
  const [showLabelPass, setShowLabelPass] = useState(false);
  const {setUser} = useContext(UserContext);
  const rootElementRef = useRef(null);
  const handleInputFocus1 = () => {
    //setShowUnderline(true); // Show the underline when input is focused
    setShowLabelUser(true);
    // document.getElementById("userInput").classList.add("animated-placeholder");
    // document.getElementById("userUnderline").classList.add("active");
  };

  const enterFullScreen = () => {
    const element = rootElementRef.current;
    if (element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // Edge
            element.msRequestFullscreen();
        }
    } else {
        console.error("The element to enter full-screen mode is not found.");
    }
};

  const handleInputFocus2 = () => {
   // setShowUnderline(true); // Show the underline when input is focused
    setShowLabelPass(true);
    // document.getElementById("passInput").classList.add("animated-placeholder");
    // document.getElementById("passUnderline").classList.add("active");
  };

  const handleInputBlur1 = () => {
    //setShowUnderline(false); // Hide the underline when input loses focus
    // Hide the label when input loses focus and its value is empty
    if (userId === "") {
      setShowLabelUser(false);
    }
  //   document.getElementById("userInput").classList.remove("animated-placeholder");
  //   document.getElementById("userUnderline").classList.remove("active");
  };

  const handleInputBlur2 = () => {
    // setShowUnderline(false); // Hide the underline when input loses focus
    // Hide the label when input loses focus and its value is empty
    if (password === "") {
      setShowLabelPass(false);
    }
    // document.getElementById("passInput").classList.remove("animated-placeholder");
    // document.getElementById("passUnderline").classList.remove("active");
  };

  

  const [loginType, setLoginType] = useState("individual"); // 'individual' or 'team'
  const [isTeam , setIsTeam] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginTypeChange = (event) => {
    setLoginType(event.target.value);
    if(event.target.value === "team"){
      setIsTeam(true);
    }
    else{
      setIsTeam(false);
    }
    console.log(event.target.value)
  };

  // const handleLogin = (event) => {
  //   event.preventDefault();
  //   console.log({userId, password});
  
  //   const loginData = {
  //     teamname: userId,
  //     password: password,
  //   };

  //   axios.post('http://localhost:8000/api/login', loginData)
  //   .then(
  //     (res) => console.log(res)

  //     document.cookie = `jwt=${res.data.jwt}`;
  //   )
  //   .catch((err) => console.log(err.response.data.detail))



  // };
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };
  const handleLogin = (event) => {
    event.preventDefault();
    console.log({ userId, password });
  
    const loginData = {
      username: userId,
      password: password,
      is_team: isTeam,
    };
    console.log("lgn" , loginData);
    // Display loading toast
    const loadingToastId = toast.loading("Logging in...");
  
    axios.post('https://api.clash.credenz.in/core/login/', loginData)
      .then((res) => {
        console.log("token",res.data.token);
  
        localStorage.setItem('token', res.data.token);
        console.log(res.data.jwt);
        if(res.data.token){
          navigate("/instruction");
        }
        else{
          navigate("/");
          toast.info(res.data.message);
          toast.dismiss(loadingToastId);
          return;
        }
        const jwt = localStorage.getItem('token');
        console.log(jwt); // Log the retrieved JWT
        enterFullScreen();

        console.log("mssg" , res.data.message);

        
  
        // Dismiss loading toast once login is completed
        toast.dismiss(loadingToastId);
  
        toast.success("Logged In Successfully!");
        setUser(loginData);
      })
      .catch((err) => {
        console.log("errror",err.response ? err.response.data.detail : err.message);
        // Dismiss loading toast if login fails
        toast.dismiss(loadingToastId);
        toast.error(err.message);
      });
  };

  return (
    
    
    <>
    <div ref={rootElementRef}
    // className="h-screen items-center flex md:flex-row sm:flex-col text-center flex-col bg-black"
    className="h-[100vh] w-full flex md:flex-row sm:flex-col justify-center items-center flex-col bg-transparent"
    style={{backgroundImage: `url('../Background 2.jpeg')`, backgroundSize: 'cover'}}    
    // onClick={createRipple}
    >
      {/* <video
        autoPlay
        loop
        muted
        className="h-full w-full object-cover fixed top-0 left-0 z-[-1]"
      >
        <source src="../wave3.mp4" type="video/mp4" />
      </video> */}
      
      <div className="image h-full w-[50%] bg-blue-40 flex flex-col  justify-center items-center">
        
        <img src="../Credenz_logo.png" alt=""  className="h-[60px] w-[60px] absolute top-[4%] left-[3%]" />
        <h1 className="text-[20px] text-white font-bold absolute top-[6.3%] left-[6.7%]">Credenz</h1>
        <img src="../clash.png" alt=""  className="h-80 w-80" />


        
      </div>
      <div className="md:w-[50%] h-screen bg-red-40 flex justify-center items-center sm:ml-12 md:ml-12 lg:ml-0">
      
 
      
    

      <div className="mt-0 sm:mt-6 bg-red-40 md:mt-5 lg:mt-5 xl:mt-0 2xl:mt-0 md:w-[60%] sm:bottom-10 sm:flex sm:place-items-center sm:items-center justify-center sm:ml-12 md:ml-12 lg:ml-0 bg-re-200 ">
        {/* <EvervaultCard text="hover" handleLogin = {handleLogin}/> */}
        
        <form
          onSubmit={handleLogin}
          className=" h-[500px] w-full  xl:mb- sm:mt-6 md:mt-20 lg:mt-20 xl:mt-20 2xl:mt-0 flex z-10 md:w-[370px] sm:w-[340px] flex-col justify-center items-center p-[0px] bg-opacity-0 rounded-[20px] bg-clip-padding backdrop-filter backdrop-blur-[30px] border border-zinc-600 gradient-shadow"
        >
        <div className="h-[100%] w-full px-[px] flex flex-col justify-center items-center gap-[40px] ">
          <h1 className="text-white justify-center text-center items-center text-[40px] font-semibold">
            Login
          </h1>
          <div className="flex flex-col ">
          {showLabelUser && ( // CondiUsertionally render the label
              <label className="text-xs  text-white">
                {loginType === "individual" ? "Username" : "Team ID"}
              </label>
          )}
            {/* <label className="absolute mt-2 text-white">{loginType === "individual" ? "Username" : "Team ID"}</label> */}
            <input
              id="username"
              className="flex border border-1 border-zinc-200 pl-2 items-center bg-transparent text-gray-200 rounded-[5px] py-2 outline-none focus:border-white w-[250px]"
              type="email"
              placeholder={showLabelUser ? "" : loginType === "individual" ? "Username" : "Team ID"}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onFocus={handleInputFocus1}
              onBlur={handleInputBlur1}
              onKeyDown={handleKeyDown}
              
            />
            </div>
            <div className="flex flex-col ">
            {showLabelPass && ( // CondiUsertionally render the label
              // <label className="text-xs transition-[translate-y-[px]] duration-[1000] text-white">Password</label>
              <label className="text-xs text-white">Password</label>

            )}
              {/* <label className="absolute mt-2 text-white">Password</label> */}
              <input
                id="password"
                className="rounded w-[250px] pl-2 border border-1 py-2 bg-transparent text-gray-200 outline-none"
                type="password"
                placeholder={showLabelPass ? "" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleInputFocus2}
                onBlur={handleInputBlur2}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div role="radiogroup" className=" RadioButtons bg-red-40 w-full h-[40px] flex justify-center items-center gap-[40px]">
              <div className="flex items-center">
                <div className="bg-white dark:bg-gray-100 rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                  <input
                    value="individual"
                    checked={loginType === "individual"}
                    onChange={handleLoginTypeChange}
                    aria-labelledby="label2"
                    type="radio"
                    name="radio"
                    className="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:bg-blue-400"
                  />
                  <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1"></div>
                </div>
                <label
                  id="label2"
                  className="text-[22px] ml-2 leading-4 font-normal text-white dark:text-gray-100"
                >
                  Individual
                </label>
              </div>

              <div className="flex items-center">
                <div className="bg-white dark:bg-gray-100 rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                  <input
                    value="team"
                    checked={loginType === "team"}
                    onChange={handleLoginTypeChange}
                    aria-labelledby="label1"
                    type="radio"
                    name="radio"
                    className="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:bg-blue-400"
                  />
                  <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1"></div>
                </div>
                <label
                  id="label1"
                  className="ml-2 text-[22px] leading-4 font-normal text-white dark:text-gray-100"
                >
                  Team
                </label>
              </div>
            </div>
            <div className=" h-[15%] w-full flex justify-center items-center">            
              <button
                
                onClick={handleLogin}
                type="button"
                
                className="lg:mt-6 wavy-btn xl:mt-0 border border-blue-400 text-white font-medium rounded-lg text-xl py-[10px] px-[30px] dark:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800"

              >
                Login
              </button>
              {/* <Link to= {'/questionhub'} className="lg:mt-6 xl:mt-0 over:animate-pulse text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-center rounded-lg text-xl px-[30px] py-[10px] dark:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800">Login</Link> */}
            </div>
          </div>

          {/* <div className="flex justify-center xl:pt-12  pt-0"> */}
          
        </form>
      </div>
      </div>
    </div>
    </>
    
  );
};

export default Login;





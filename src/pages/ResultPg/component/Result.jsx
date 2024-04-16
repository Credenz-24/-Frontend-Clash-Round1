import React, { useState, useEffect } from "react";
import axios from "axios";
// import pho1 from '../score.png';
// import pho2 from '../rank.png';
import Circles from "../shapes/Circles";
const Home = () => {
  const [per, setPer] = useState([]);
  const [isError, setIsError] = useState("");
  // const [per,setPer]= useState([
  //     {
  //         "id":1,
  //         "percentage" : 65,
  //     },
  //     {
  //         "id":2,
  //         "percentage" : 20,

  //     },
  //     {
  //         "id":3,
  //         "percentage" : 30,

  //     }
  // ])

  // const getMyPostData = async () => {
  //     try {
  //       const res = await axios.get("http://127.0.0.1:8000/core/result_page/");
  //       setPer(res.data);

  //     } catch (error) {
  //       setIsError(error.message);
  //     }
  //   };

  const getMyPostData = async () => {
    try {
      const token = "81075178c5e566fc8b1835de29b8f2118f31c0f0"; // Replace 'your-authentication-token' with your actual token
      const config = {
        headers: {
          Authorization: `token ${token}`,
        },
      };
      const res = await axios.get(
        "http://127.0.0.1:8000/core/result_page/",
        config
      );
      setPer(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  //   console.log(per);

  // NOTE:  calling the function
  useEffect(() => {
    getMyPostData();
    console.log(per);
  }, [per]);

  return (
    <>
      <div className="main h-[86vh] w-full flex flex-col justify-center items-center ">
        <div className="container flex flex-wrap items-center justify-center h-[100%] w-full gap-16">
          <div className="leftbox w-72 h-[80vh] rounded-3xl flex flex-col justify-between items-center  z-[100] backdrop-blur-[20px] border-2 border-blue-500 px-[10px] py-[20px]">
            <div className="left-top flex flex-col justify-center items-center space-[15px]  w-full">
              <div className="profile bg-blue-200 h-[18vh] w-[18vh] rounded-full"></div>
              <h1 className="names text-[26px] text-white font-semibold">
                {per.username}
              </h1>
              <h1 className="teamName text-white text-[20px] ">
                {per.team_name}
              </h1>
            </div>
            <div className="left-mid h-[450px] w-full flex flex-col justify-center items-center text-[20px] ">
              <div className="Lifelines text-white flex flex-col items-center justify-center">
                <h3 className="heading2 text-[21px]">Lifelines used: </h3>
                <h1 className="number font-bold text-[23px]">4</h1>
              </div>
            </div>

            <div className="left-bottom flex flex-col justify-center items-center gap-[20px]  w-full">
              <button className="bg-blue-500 text-[20px] hover:bg-blue-800 text-white py-2 px-4 rounded-full">
                Feedback
              </button>
            </div>
          </div>
          <div className="rightbox  flex flex-col w-[120vh] h-[80vh] rounded-[30px] backdrop-blur-[20px] border-2 border-blue-500  justify-center items-start z-[100]">
            <div className="jellyfish  z-5 h-[60%] w-[100%] rounded-[30px]  bg-transparent flex justify-around items-center ">
              <div className="photol flex flex-col h-[30vh] w-[35vh] bg-blue-500 rounded-[30px] justify-end p-4 items-center gap-[5px] z-[-1]">
                <img
                  src="../score.png"
                  alt=""
                  className="h-[100px] w-[100px]"
                />

                <div className="in flex flex-col h-[10vh] w-[30vh] rounded-[15px] bg-[#053884]  justify-center items-center">
                  <h1 className="text-white text-[28px] font-semibold ">1</h1>
                  <h1 className="text-white opacity-[90%] text-[15px] font-semibold ">
                    Score
                  </h1>
                </div>
              </div>
              <div className="out flex flex-col  h-[30vh] w-[35vh] rounded-[30px] bg-blue-500 justify-end p-4 items-center gap-[10px] z-[-1]">
                <img src="../rank.png" alt="" className="h-[80px] w-[95px]" />

                <div className="in flex flex-col h-[10vh] w-[30vh] rounded-[15px] bg-[#053884] justify-center items-center">
                  {/* <h1 className="text-white text-[25px] font-semibold ">{per.team_score}</h1> */}
                  <h1 className="text-white text-[28px] font-semibold ">1</h1>
                  <h1 className="text-white opacity-[90%] text-[15px] font-semibold ">
                    Rank
                  </h1>
                </div>

              </div>
            </div>
            <div className="circlesmain  h-[40%] w-[100%] flex justify-around items-start gap-3">
              <div className="flex flex-col h-full w-[40%] justify-center items-center gap-2 ">
                <div className="circle flex flex-row justify-around item-center  gap-10">
                  <Circles num={per.user_accuracy} />
                  {/* <Circles num={(per.user_accuracy).toFixed(2)}/> */}
                </div>

                <div className="written text-white flex flex-row  justify-around item-center gap-24 mx-9 font-semibold text-[18px]">
                  <h3>Accuracy</h3>
                </div>
              </div>

              <div className=" w-[40vh] h-[25vh] flex flex-col items-center justify-center gap-6 text-lg text-white">
                <div className="w-[40vh] h-[20vh] justify-start items-center flex flex-row  gap-7">
                  <h3>Total Questions</h3>
                  <div className=" rounded-lg h-[50px] w-[95px] bg-blue-500 font-semibold text-[18px]"></div>
                </div>
                <div className="w-[40vh] h-[20vh] flex flex-row justify-start items-center gap-1">
                  <h3>Correct Questions</h3>
                  <div className="bg-blue-500 rounded-lg h-[50px] w-[95px] font-semibold text-[18px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

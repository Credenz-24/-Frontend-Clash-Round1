import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar ,buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Home = () => {
  const [per, setPer] = useState([]);
  const [isError, setIsError] = useState("");

  
  const getMyPostData =async()=>{
    try {
      axios
        .get("https://api.clash.credenz.in/core/result_page/", {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setPer(response.data)
          // console.log("result", response.data)
        })
        .catch((error) => {
          console.error("Error", error);
        });
    } catch (error) {
      console.error("Error skipping question:", error);
    }
    }
  
    useEffect(() => {
      getMyPostData();
    }, []);
  

  //   console.log(per);

  // NOTE:  calling the function
  useEffect(() => {
    getMyPostData();
    // console.log(per);
  }, []);

  return (
    <>
<style>
    {`
      @media only screen and (max-width: 468px)
      {
        .container{
          height:620px;
          width:100%;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:4vw;
          overflow-x:hidden;
        }
        .leftbox{
          height:400px;
          width:100%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          gap:20px;
        }
        .left-top {
          height:40%;
          width:100%;
          display:flex;
          flex-direction:row;
          justify-content:center;
          align-items:center;
          padding: 0 4vw;
        }
        .left-top .profile{
          height:100px;
          width:35%;
          display:flex;
          flex-direction:row;
          justify-content:center;
          align-items:center;
          
        }
        .left-top .profile img{
          height:100%;
          width:100%;
          display:flex;
          flex-direction:row;
          justify-content:center;
          align-items:center;
        }
        
        .left-top .name{
          height:100px;
          width:70%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
        }
        .left-mid-stats{
          height:45%;
          width:100%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          padding: 0 4vw;
          color:white;
          gap:4px;
          // background-color:red;
        }
        .left-mid-stats .text{
          height:54%;
          width:100%;
          display:flex;
          flex-direction:row;
          justify-content:start;
          align-items:center;
          color:white;
          gap:8;
          // background-color:green;
        }
        .left-bottom{
          height:15%;
          width:100%;
          display:flex;
          flex-direction:row;
          justify-content:center;
          align-items:center;
          padding: 0 4vw;
        }
        .rightbox{
          height:800px;
          width:100%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          gap:40px;
          border:none;
        }
        .right-top{
          height:50%;
          width:100%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          // background-color:red;
          gap:30px
        }
        .photo1{
          height:50%;
          width:80%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
        }
        .in{
          height:50%;
          width:80%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
        }
        .circlesmain{
          height:30%;
          width:100%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
        }
        .stats{
          display:none;
        }
      }
      @media only screen and (min-width: 600px)
      {
        .left-mid-stats{
          display:none;
        }
      }
    `}
    </style>

      <div className="main h-[auto] overflow-y-scroll w-full flex flex-col justify-center items-center ">
        <div className="container flex flex-wrap items-center justify-center h-[100%] w-full gap-16">
          <div className="flex flex-col text-center"> 
        <h1 className="text-white text-2xl font-bold m-4">RESULT</h1>
          <div className="leftbox w-72 h-[auto] rounded-3xl flex flex-col justify-between items-center z-[100] backdrop-blur-[20px] border-2 border-blue-500 px-[10px] py-[40px]">
            
            
            <div className="left-top h-[50%] flex flex-col justify-center items-center space-[10px] bg-red-90 w-full">
              <div className="profile h-[20vh] w-[20vh] rounded-full bg-red-600">
                <img src="../diver.png" alt="" />

              </div>
              </div>
              <div className="name h-[12vh] w-full bg-purple-70 flex flex-col justify-center items-center">
                <h1 className="names text-[26px] text-white font-semibold">
                    {per.username}
                </h1>
                <h1 className="teamName text-white text-[20px] ">
                    {per.team_name}
                </h1>
              </div>
            </div>
          <div className="left-mid-stats h-[40%] w-full bg-green-80 flex flex-col justify-evenly items-center">
                <div className="text w-[100%] h-[40%] justify-start items-center flex flex-row  gap-10 align-middle">
                  <h3>Total Questions</h3>
                  <div className="flex rounded-lg h-[50px] w-[95px] bg-blue-500 font-semibold text-[18px] items-center justify-center">{per?.total_questions}</div>
                </div>
                <div className="text w-[100%] h-[40%] flex flex-row justify-start items-center gap-5">
                  <h3>Correct Questions</h3>
                  <div className="bg-blue-500 rounded-lg h-[50px] w-[95px] font-semibold text-[18px] align-middle">{per?.correct_questions}</div>
                </div>
          </div>

            <div className="left-bottom h-[10%] flex flex-col justify-center items-center gap-[20px] bg-purple-60  w-full">
              {/* <button className="bg-blue-500 text-[20px] hover:bg-blue-800 text-white py-2 px-4 rounded-full">
                Feedback
              </button> */}
            </div>
          </div>
          <div className="rightbox  flex flex-col w-[100vh] h-[80vh] rounded-[30px] backdrop-blur-[20px] border-2 border-blue-500  justify-center items-start z-[100]">
            <div className="right-top  z-5 h-[60%] w-[100%] rounded-[30px]  bg-transparent flex justify-around items-center ">
              <div className="photo1 flex flex-col h-[30vh] w-[35vh] bg-blue-500 rounded-[30px] justify-end p-4 items-center gap-[5px] z-[-1]">
                <img
                  src="../score.png"
                  alt=""
                  className="h-[100px] w-[100px]"
                />

                <div className="in flex flex-col h-[10vh] w-[30vh] rounded-[15px] bg-[#053884]  justify-center items-center">
                  <h1 className="text-white text-[28px] font-semibold ">{per?.overall_score}</h1>
                  <h1 className="text-white opacity-[90%] text-[15px] font-semibold ">
                    Score
                  </h1>
                </div>
              </div>
              <div className="photo1 flex flex-col  h-[30vh] w-[35vh] rounded-[30px] bg-blue-500 justify-end p-4 items-center gap-[10px] z-[-1]">
                <img src="../rank.png" alt="" className="h-[80px] w-[95px]" />

                <div className="in flex flex-col h-[10vh] w-[30vh] rounded-[15px] bg-[#053884] justify-center items-center">
                  {/* <h1 className="text-white text-[25px] font-semibold ">{per.team_score}</h1> */}
                  <h1 className="text-white text-[28px] font-semibold ">{per?.team_rank}</h1>
                  <h1 className="text-white opacity-[90%] text-[15px] font-semibold ">
                    Rank
                  </h1>
                </div>

              </div>
            </div>
            <div className="circlesmain  h-[40%] w-[100%] flex justify-around items-start gap-3">
              <div className=" accuracy flex flex-col h-full w-[40%] justify-center items-center gap-2 ">
                <div className="circle flex flex-row justify-around item-center  gap-10">
                <div style={{ width: 155, height: 155 }}>
                <CircularProgressbar value={(per?.user_accuracy)} text={`${(per?.user_accuracy)}%`} strokeWidth={12} 
                    styles={buildStyles({
                        pathColor: `#3B82F6`,
                        textColor: '#fff',
                        trailColor: '#052c66',
                        backgroundColor: '#3e98c7',
                        textSize: '16px',
                    })}/>

                  </div>
                </div>

                <div className="written text-white flex flex-row  justify-around item-center gap-24 mx-9 font-semibold text-[18px]">
                  <h3>Accuracy</h3>
                </div>
              </div>

              <div className=" stats w-[40vh] h-[25vh] flex flex-col items-center justify-center gap-6 text-lg text-white align-middle">
                <div className="w-[40vh] h-[20vh] justify-start items-center flex flex-row gap-7">
                  <h3>Total Questions</h3>
                  <div className="flex rounded-lg h-[50px] w-[95px] bg-blue-500 font-semibold text-[18px] items-center justify-center">
                      {per?.total_questions}
                  </div>
                </div>
                <div className="w-[40vh] h-[20vh] justify-start items-center flex flex-row gap-1">
                  <h3>Correct Questions</h3>
                  <div className="flex bg-blue-500 rounded-lg h-[50px] w-[95px] font-semibold text-[18px] items-center justify-center">{per?.correct_questions}</div>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopCards from './props/TopCards';
import Junior from './leads/Junior';
import Senior from './leads/Senior';

function Leaderboard() {
    // Initialize state for both junior and senior lists
    const [juniorLeaderboard, setJuniorLeaderboard] = useState([]);
    const [seniorLeaderboard, setSeniorLeaderboard] = useState([]);
    const [acceptedConditions, setAcceptedConditions] = useState(false);


    const [per, setPer] = useState([]);

    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        setCurrentStep(currentStep+1);
    }
    const handlePrev = () => {
        setCurrentStep(currentStep-1);
    }

    const handleProceedClick = () => {
        if (acceptedConditions) {
        //   console.log("Proceeding...");
          navigate("/question")
        } else {
        //   console.log("Please accept the conditions.");
        }
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.clash.credenz.in/core/leaderboard/', {
                    headers: {"Authorization": localStorage.getItem('jwt')}
                });
                // Separate junior and senior lists
                const { junior_list, senior_list } = response.data;
                setJuniorLeaderboard(junior_list);
                setSeniorLeaderboard(senior_list);
            } catch (error) {
                // console.error("Error fetching leaderboard data:", error);
                // Handle error scenarios (e.g., showing an error message)
            }
        };

        fetchData();
    }, []);



    // console.log("Here :",juniorLeaderboard);

    return (
      <>
      <style>
            {`
                @media only screen and (max-width: 468px) {
                    .container{
                        width:100%;
                        height:620px;
                        overflow-x:hidden;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        padding: 2vw 2vw;
                    }
                    .buttons{
                        position:absolute;
                        bottom:5%;
                    }
                }
                @media only screen and (min-width: 500px) {
                    .container{
                        width:100%;
                        height:86.7vh;
                        overflow-x:hidden;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        padding: 2vw 2vw;
                    }
                }
                @media only screen and (min-width: 2000px) {
                    .container{
                        width:100%;
                        height:100%;
                        overflow-x:hidden;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;
                        padding: 2vw 2vw;
                    }
                }
                @media only screen and (max-height: 700px) {
                    .container{
                        width:100%;
                        height:580px;
                        overflow-x:hidden;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;
                        padding: 2vw 2vw;
                    }
                }
            `}
        </style>
        <div className="container h-[86.4vh] w-full bg-red-60 flex flex-col justify-center items-center overflow-y-hidden">
            {(currentStep=== 0) ? (
                <>
                    <Junior leadJunior={juniorLeaderboard}/>
                    <div className="buttons absolute bottom-[3%] w-full bg-orange- flex justify-center items-center gap-[50px]">
                        <button className="btnPrev text-white px-[20px] py-[10px] bg-blue-500 rounded-full hover:bg-blue-800 " onClick={handleNext}>
                            SENIORS
                        </button>
                    </div>
                
                </>
            ): (null)}

            {(currentStep=== 1) ? (
                <>
                    <Senior leadSenior={seniorLeaderboard}/>
                    <div className="buttons absolute bottom-[3%] w-full bg-orange-60 flex justify-center items-center gap-[50px]">
                        <button className="btnPrev text-white px-[20px] py-[10px] bg-blue-500 rounded-full hover:bg-blue-800 " onClick={handlePrev}>
                            JUNIORS
                        </button>
                       <button className="btnPrev text-white px-[20px] py-[10px] bg-blue-500 rounded-full hover:bg-blue-800 ">
                            Proceed
                        </button>
                    </div>
                
                </>
            ): (null)}
            {/* <div className="Team h-full w-full flex flex-col justify-center items-center ">
                <div className="top-3-juniors h-[30%] w-full bg-purple-40 flex justify-center items-center gap-[6vw] ">
                {
                    juniorLeaderboard.filter((items, index) => (index < 3))
                        .map((item) => (
                            <TopCards key={item.username} name={item.username} teamScore={item.team_score}  />
                        ))
                }
                </div>
                
                <div className="juniors-table h-[60%] w-full flex justify-center items-center bg-green-40 ">
                    <div className=" junior h-[300px] w-[700px] mx-auto bg-red-80 shadow-md rounded-lg overflow-y-scroll no-scrollbar border-[2px] border-solid border-blue-500">
                    <h2 className="text-2xl sticky top-0 font-bold text-center text-white bg-[#09112c] p-4 border-b-[2px] border-solid border-blue-500">Junior Leaderboard</h2>
                    <ul className="divide-y divide-blue-900">
                        {juniorLeaderboard.map((entry, index) => (
                            <li key={index} className="flex justify-between items-center h-[78px] w-[100%] p-4 hover:bg-[#0b143e] hover:text-zinc-800">
                                <span className="font-semibold text-blue-400">{index + 1}</span>
                                <span className="text-white font-medium">{entry.username}</span>
                                <span className="text-gray-200">{entry.team_score} pts</span>
                                <span className="text-sm text-gray-300">Q{entry.correct_questions}</span>
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </div> */}
        </div>
      </>
    );
}

export default Leaderboard;

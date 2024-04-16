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
          console.log("Proceeding...");
          navigate("/question")
        } else {
          console.log("Please accept the conditions.");
        }
      };

    const getMyPostData = async () => {
        try {
            const token = 'a0f19bad8e2eb1a21769e9c2be1ea343fa02b1c8'; // Replace 'your-authentication-token' with your actual token
            const config = {
                headers: {
                    Authorization: `token ${token}`
                }
            };
            const res = await axios.get("http://127.0.0.1:8000/core/result_page/", config);
            setPer(res.data);
        } catch (error) {
            setIsError(error.message);
        }
    };
    console.log(per);

    useEffect(() => {
        getMyPostData();
    }, [per]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/core/leaderboard/', {
                    headers: {"Authorization": localStorage.getItem('jwt')}
                });
                // Separate junior and senior lists
                const { junior_list, senior_list } = response.data;
                setJuniorLeaderboard(junior_list);
                setSeniorLeaderboard(senior_list);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
                // Handle error scenarios (e.g., showing an error message)
            }
        };

        fetchData();
    }, []);



    console.log("Here :",juniorLeaderboard);

    return (
      <>
        <div className="container h-[86.4vh] w-[100%] bg-red-60 flex flex-col justify-center items-center overflow-y-hidden">
            {(currentStep=== 0) ? (
                <>
                    <Junior leadJunior={juniorLeaderboard}/>
                    <div className="buttons absolute bottom-0 w-full bg-orange- flex justify-center items-center gap-[50px]">
                        <button className="btnPrev text-white px-[20px] py-[10px] bg-blue-500 rounded-full hover:bg-blue-800 " onClick={handleNext}>
                            Next
                        </button>
                    </div>
                
                </>
            ): (null)}

            {(currentStep=== 1) ? (
                <>
                    <Senior leadSenior={seniorLeaderboard}/>
                    <div className="buttons h-[5%] w-full bg-orange-60 flex justify-center items-center gap-[50px]">
                        <button className="btnPrev text-white px-[20px] py-[10px] bg-blue-500 rounded-full hover:bg-blue-800 " onClick={handlePrev}>
                            Previous
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

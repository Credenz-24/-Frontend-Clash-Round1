import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopCards from './props/TopCards';

function Leaderboard() {
    // Initialize state for both junior and senior lists
    const [juniorLeaderboard, setJuniorLeaderboard] = useState([]);
    const [seniorLeaderboard, setSeniorLeaderboard] = useState([]);

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
        <div className="container h-[86.4vh] w-[100%] bg-red-60 flex flex-col justify-center items-center">
            <div className="top-3-juniors h-[45%] w-full bg-purple-40 flex justify-center items-center gap-[6vw] ">
                {
                    
                    <>
                        <TopCards/>
                        <TopCards/>
                        <TopCards/>
                    </>
                }

            </div>
            <div className="juniors-table h-[55%] w-full flex justify-center items-center bg-green-400">
                <div className=" junior h-[300px] w-[700px] mx-auto bg-red-800 shadow-md rounded-lg overflow-hidden">
                <h2 className="text-2xl font-bold text-center text-gray-800 bg-gray-100 p-4">Junior Leaderboard</h2>
                <ul className="divide-y divide-gray-300">
                    {juniorLeaderboard.map((entry, index) => (
                        <li key={index} className="flex justify-between items-center p-4 hover:bg-gray-50">
                            <span className="font-semibold text-indigo-600">{index + 1}</span>
                            <span className="text-gray-800 font-medium">{entry.username}</span>
                            {/* Adjust according to your data structure */}
                            <span className="text-gray-500">{entry.total_questions} pts</span>
                            <span className="text-sm text-gray-400">Q{entry.correct_questions}</span>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
      </>
    );
}

export default Leaderboard;

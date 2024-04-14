import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    return (
      <div className=''>
        <div className="max-w-lg mx-auto bg-red-500 shadow-md rounded-lg overflow-hidden">
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

        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 bg-gray-100 p-4">Senior Leaderboard</h2>
          <ul className="divide-y divide-gray-300">
              {seniorLeaderboard.map((entry, index) => (
                  <li key={index} className="flex justify-between items-center p-4 hover:bg-gray-50">
                      <span className="font-semibold text-indigo-600">{index + 1}</span>
                      <span className="text-gray-800 font-medium">{entry.username}</span>
                      {/* Adjust according to your data structure */}
                      <span className="text-gray-500">{entry.team_score} pts</span>
                      <span className="text-sm text-gray-400">Q{entry.correct_questions}</span>
                  </li>
              ))}
          </ul>
        </div>
      </div>
    );
}

export default Leaderboard;

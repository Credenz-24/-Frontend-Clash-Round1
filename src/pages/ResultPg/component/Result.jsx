import React, { useState, useEffect } from 'react';
import axios from 'axios';

import pho1 from '../asset-img/download.jpeg';
import pho2 from '../asset-img/download.jpeg';
import Circles from '../shapes/Circles';

const Result = () => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState([]);
    const [per, setPer] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/core/result_page/', {
                    headers: { Authorization: `token ${localStorage.getItem("token")}` },
                });
                setUserData(response.data);
                setError(null);
            } catch (error) {
                setError("Error fetching user data");
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (userData) {
            setPer([
                {
                    id: 1,
                    percentage: 65,
                },
                {
                    id: 2,
                    percentage: userData.correct_questions,
                },
                {
                    id: 3,
                    percentage: userData.user_accuracy ? userData.user_accuracy.toFixed(2) : 0,
                }
            ]);
        }
    }, [userData]);

    if (!userData) {
        return null; // Or you can render a loading spinner or message
    }

    return( 
        <>
            <div className='main h-[86vh] w-full flex flex-col justify-center items-center '>
                <div className='container flex flex-wrap items-center justify-center h-[100%] bg-black w-full gap-16'>
                    <div className='leftbox w-72 h-[70vh] rounded-3xl flex flex-col justify-between items-center  z-[100] backdrop-blur-[20px] border-2 border-white px-[10px] py-[20px]'>
                        <div className='left-top flex flex-col justify-start items-center gap-[20px]'>
                            <div className='profile bg-slate-400 h-[18vh] w-[18vh] rounded-full'></div>
                            <h1 className='names text-[26px] text-white font-semibold'>{userData.username}</h1>
                            <h1 className='teamName text-white text-[20px] '>{userData.teammate_one}</h1>
                        </div>
                        <div className='left-bottom flex flex-col justify-center items-center gap-[20px]'>
                            <h1 className='feedback  text-white text-[18px] '>Please share your feedback!</h1>
                            <button className='bg-blue-800 text-[20px] hover:bg-blue-500 text-white py-2 px-4 rounded-full'>Feedback</button>
                        </div>
                    </div>
                    <div className='rightbox flex w-[100vh] h-[70vh] rounded-[30px] backdrop-blur-[20px] border-2 border-white  justify-center items-start z-[100]'>
                        <div className='jellyfish z-5 h-[40vh] w-[100%] rounded-[30px]  bg-transparent flex justify-around items-center absolute'>
                            <div className='photol flex flex-col justify-center items-center gap-[-5px]'>
                                <h1 className='text-white text-[25px] font-semibold'>Score</h1>
                                <h1 className='text-white text-[55px] font-semibold absolute top-[80px]'>{userData.team_score}</h1>
                                <img src={pho1} className='h-[30vh] w-[30vh]' alt='pho1' />
                            </div>
                            <div className='photol flex flex-col justify-center items-center gap-[-5px]'>
                                <h1 className='text-white text-[25px] font-semibold '>Rank</h1>
                                <h1 className='text-white text-[55px] font-semibold absolute top-[80px]'>#{userData.team_rank}</h1>
                                <img src={pho2} className='h-[30vh] w-[30vh] ' alt='pho2' />
                            </div>
                        </div>
                        <div className='circlesmain my-72 h-[25vh] w-[80vh] flex flex-col justify-around items-center gap-3'>
                            <div className='circle flex flex-row justify-around item-center  gap-10'>
                                {per.map((percent) => (
                                    <Circles key={percent.id} num={percent.percentage} />
                                ))}
                            </div>
                            <div className='written text-white flex flex-row  justify-around item-center gap-24  font-semibold text-[18px]'>
                                <h3>Lifelines</h3>
                                <h3>Correct questions</h3>
                                <h3>Accuracy</h3>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Result;

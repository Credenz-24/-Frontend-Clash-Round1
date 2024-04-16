import React, { useState, useEffect } from 'react';
import axios from "axios";
// import pho1 from './assests/download.jpeg';
// import pho2 from './assests/download.jpeg';
import Circles from '../shapes/Circles';
const Home = () => {
    const [per,setPer] = useState([]);
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

    //   console.log(per);

    
    // NOTE:  calling the function
    useEffect(() => {
        getMyPostData();
    }, [per]);
    
        // console.log(per);
        // console.log(per.user_accuracy);
        let acc = per.user_accuracy;

    
    return( 
        <>
        
        <div className='main h-[86vh] w-full flex flex-col justify-center items-center '>
        <div className='container flex flex-wrap items-center justify-center h-[100%] bg-black w-full gap-16'>
        <div className='leftbox w-72 h-[80vh] rounded-3xl flex flex-col justify-between items-center  z-[100] backdrop-blur-[20px] border-2 border-white px-[10px] py-[20px]'>
                <div className='left-top flex flex-col justify-center items-center space-[15px]  w-full'>
                    <div className='profile bg-slate-400 h-[18vh] w-[18vh] rounded-full'></div>
                    <h1 className='names text-[26px] text-white font-semibold'>{per.username}</h1>
                    <h1 className='teamName text-white text-[20px] '>{per.team_name}</h1>
                </div>
                <div className='left-mid h-[450px] w-full flex flex-col justify-center items-center text-[20px] '>
                    <div className='quesAttempted text-white flex flex-col items-center justify-center '>
                        <h3 className='heading1 text-[21px]'>Total Questions:</h3>
                        <h1 className='number font-bold text-[23px]'>{per.total_questions}</h1>
                       </div>
                       <div className='Lifelines text-white flex flex-col items-center justify-center'>
                        <h3 className='heading2 text-[21px]'>Lifelines used: </h3>
                        <h1 className='number font-bold text-[23px]'>4</h1>
                       </div>
                   
                </div>

                <div className='left-bottom flex flex-col justify-center items-center gap-[20px]  w-full'>
                    
                    {/* <h1 className='feedback  text-white text-[18px] '>Please share your feedback!</h1> */}
                    <button className='bg-blue-800 text-[20px] hover:bg-blue-500 text-white py-2 px-4 rounded-full'>Feedback</button>
                
                </div>
            
            </div>
            <div className='rightbox  flex flex-col w-[100vh] h-[80vh] rounded-[30px] backdrop-blur-[20px] border-2 border-white  justify-center items-start z-[100]'>
                <div className='jellyfish  z-5 h-[60%] w-[100%] rounded-[30px]  bg-transparent flex justify-around items-center '>
                    <div className='photol flex flex-col justify-center items-center gap-[-5px]'>
                        <h1 className='text-white text-[25px] font-semibold'>Score</h1>
                        <h1 className='text-white text-[55px] font-semibold absolute top-[80px]'>{per.team_score}</h1>
                        {/* <img src={pho1} className='h-[30vh] w-[30vh]' ></img> */}
                        {/* <div className='px-[20px] py-[5px] text-[20px] bg-slate-400 rounded-lg'>Score</div> */}
                    </div>
                    <div className='photol flex flex-col justify-center items-center gap-[-5px]'>
                    <h1 className='text-white text-[25px] font-semibold '>Rank</h1>
                    <h1 className='text-white text-[55px] font-semibold absolute top-[80px]'>{per.team_rank}</h1>
                        {/* <img src={pho2} className='h-[30vh] w-[30vh] ' ></img> */}
                        {/* <div className='px-[20px] py-[5px] text-[20px] bg-slate-400 rounded-lg'>Rank</div> */}
                    </div>
                </div>
                <div className='circlesmain  h-[40%] w-[100%] flex justify-around items-start gap-3'>
                    <div className='flex flex-col h-full w-[40%] justify-center items-center gap-2 '>
                        <div className='circle flex flex-row justify-around item-center  gap-10'>
                                {/* <Circles num={(per.user_accuracy).toFixed(2)}/> */}
                                {/* <Circles num={(acc).toFixed(2)}/> */}

                        </div>
                    
                        <div className='written text-white flex flex-row  justify-around item-center gap-24 mx-9 font-semibold text-[18px]'>
                            <h3>Accuracy</h3>
                        </div>   
                    </div> 

                    <div className=' w-[40vh] h-[25vh] flex flex-col items-center justify-center gap-6 text-lg text-white'>
                         <div className='w-[40vh] h-[20vh] justify-center items-center flex flex-col  gap-1'>
                            <h3>Time taken</h3> 
                            <div className=' rounded-lg h-[50px] w-[50px] bg-blue-500 font-semibold text-[18px]'></div>
                        </div>
                         <div className='w-[40vh] h-[20vh] flex flex-col ustify-center items-center gap-1'>
                            <h3>Correct questions</h3>
                            <div className='bg-blue-500 rounded-lg h-[50px] w-[50px] font-semibold text-[18px]'></div>

                         </div>
                    </div>
                    
                </div>
                
               
            </div>
        </div>

        </div>
        
        </>
    )
}

export default Home;
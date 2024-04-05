import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';

const MarkingScheme = () => {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:8000/core/current_question/", { 
          headers: { "Authorization": `token ${localStorage.getItem('token')}` } 
        })
        .then((response) => { 
          setMyData(response.data);
          console.log(response);
        })
        .catch((error) => {
          setIsError(true);
          console.error('Error fetching question:', error);
        });
    } catch (error) {
      setIsError(true);
      console.error('Error fetching question:', error);
    }
  }, []);

  return (
    <aside className='flex'>
    {isError && <div>Error fetching question.</div>}
    <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto m-16 bg-gradient-to-r from-indigo-600 to-cyan-600 shadow-xl rounded-lg text-gray-900 h-[53vh] w-[26vw]">
      <div className="flex">
        <div className="h-14 overflow-hidden bg-slate-100 m-4 mr-2 w-[50%]">
            <div className='text-center'>
                Score
                <div>
                    1
                </div>
            </div>
        </div>
        <div className="h-14 overflow-hidden bg-slate-100 m-4 ml-2 w-[50%]">
            <div className='text-center'>
                Username
                <div>
                    Shounak
                </div>
            </div>
        </div>
      </div>
      <div className="h-12 overflow-hidden bg-slate-100 mr-4 ml-4 flex">
        <div className='w-[73%] bg-slate-200 m-2 text-center'>
           Current Streak
        </div>
        <div className='w-[20%] bg-slate-200 mr-2 mt-2 mb-2 text-center'>
           0
        </div>
        
      </div>
      <div className="h-12 overflow-hidden bg-slate-100 mr-4 ml-4 flex mt-4">
        <div className='w-[67%] bg-slate-200 m-2 text-center'>
          Marking Scheme
        </div>
        {myData.scheme && (
          <>
            <div className='w-[12%] bg-slate-200 mr-2 mt-2 mb-2 text-center'>
              {myData.scheme.positive}
            </div>
            <div className='w-[12%] bg-slate-200 mr-2 mt-2 mb-2 text-center'>
              {myData.scheme.negative}
            </div>
          </>
        )}
      </div>
      <div className="bg-slate-100 m-4 flex flex-col items-center justify-center">
        <div className='flex items-center justify-center h-auto bg-slate-400 w-[100%] text-center'>
          Lifelines
        </div>
        <button className='flex items-center justify-center h-auto mt-2 w-[40%] sm:w-[30%] md:w-[25%] bg-slate-400 text-center overflow-hidden'>
          Lifeline1
        </button>
        <button className='flex items-center justify-center h-auto mt-2 w-[40%] sm:w-[30%] md:w-[25%] bg-slate-400 text-center overflow-hidden'>
          Lifeline2
        </button>
        <button className='flex items-center justify-center h-auto mt-2 w-[40%] sm:w-[30%] md:w-[25%] bg-slate-400 text-center overflow-hidden'>
          Lifeline3
        </button>
        <button className='flex items-center justify-center h-auto mt-2 w-[40%] sm:w-[30%] md:w-[25%] bg-slate-400 text-center overflow-hidden'>
          Lifeline4
        </button>
      </div>
    </div>
    </aside>
  );
};

export default MarkingScheme;

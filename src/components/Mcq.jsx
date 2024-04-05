// import React, { useEffect, useState } from "react";
// import axios from 'axios';

// export default function Questions() {
//   const [myData, setMyData] = useState([]);
//   const [isError, setIsError] = useState(false);
//   const [nextQuestion ,setNextQuestion] = useState(false);
//   const [option, setOption] = useState("");

//   useEffect(() => {
//     try {
//       axios
//         .get("http://127.0.0.1:8000/core/current_question/", { 
//           headers: { "Authorization": `token ${localStorage.getItem('token')}` } 
//         })
//         .then((response) => { 
//           setMyData(response.data);
//           console.log(response);
//         })
//         .catch((error) => {
//           setIsError(true);
//           console.error('Error fetching question:', error);
//         });
//     } catch (error) {
//       setIsError(true);
//       console.error('Error fetching question:', error);
//     }
//   }, [nextQuestion]);

//   const selectedOption={
//     selected: option
//   }
//   const handleSubmit = ()=>{
//     axios.post("http://127.0.0.1:8000/core/submit/", selectedOption, { 
//       headers: { "Authorization": `token ${localStorage.getItem('token')}` } 
//     })
//     setNextQuestion(!nextQuestion);
//     console.log(nextQuestion);
//     console.log(selectedOption);
//   }

//   return (
//     <div className="mt-20">
//       {isError && <div>Error fetching question.</div>}
//       {myData.question_data && <div className="h-[40vh] w-[50vw] bg-gradient-to-r from-indigo-600 to-cyan-600 flex border border-black rounded-xl p-4 bg-opacity-10">
//         <div className="text-xl font-bold overflow-y-auto text-slate-100">
//           <span className="font-bold text-xl ">Q1 :-</span>
//           <br />
//           {myData.question_data.question_md}
//         </div>
//       </div>}
//       <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-10 w-[50vw] ">
//         {myData.question_data && (
//           <>
//             <button
//               id="a"
//               type="button"
//               className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2"
//               onClick={setOption("a")}
//             >
//               <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
//                 A
//               </span>
//               <span className="ml-2">{myData.question_data.a}</span>
//             </button>
//             <button
//               id="b"
//               type="button"
//               onClick={setOption("b")}
//               className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2"
//             >
//               <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
//                 B
//               </span>
//               <span className="ml-2">{myData.question_data.b}</span>
//             </button>
//             <button
              
//               id="c"
//               onClick={setOption("c")}

//               type="button"
//               className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2"
//             >
//               <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
//                 C
//               </span>
//               <span className="ml-2">{myData.question_data.c}</span>
//             </button>
//             <button
//               id="d"
//               type="button"
//               onClick={setOption("d")}
//               className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2"
//             >
//               <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
//                 D
//               </span>
//               <span className="ml-2">{myData.question_data.d}</span>
//             </button>
//           </>
//         )}
//       </div>
//       <div className="align-middle justify-center relative flex mt-10"> 
//         <button
//           type="button"
//           className="py-2.5 px-5 me-2 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//           onclick = {handleSubmit}
//         >
//           NEXT
//         </button>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function Questions() {
  const [myData, setMyData] = useState({});
  const [isError, setIsError] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // State to keep track of selected option

  useEffect(() => {
    const fetchQuestion1 = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/core/current_question/", { 
          headers: { "Authorization": `token ${localStorage.getItem('token')}` } 
        });

        setMyData(response.data);
        setIsError(false);
        console.log(response.data);
      } catch (error) {
        setIsError(true);
        console.error('Error fetching question:', error);
        
      }
    };

    fetchQuestion1();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/core/current_question/", { 
        headers: { "Authorization": `token ${localStorage.getItem('token')}` } 
      });

      setMyData(response.data);
      setIsError(false);
      console.log(response.data);
    } catch (error) {
      setIsError(true);
      console.error('Error fetching question:', error);
    }
  };

  // const fetchQuestion = async () => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:8000/core/current_question/", { 
  //       headers: { "Authorization": `token ${localStorage.getItem('token')}` } 
  //     });
  //     setMyData(response.data);
  //     setIsError(false);
  //   } catch (error) {
  //     setIsError(true);
  //     console.error('Error fetching question:', error);
  //   }
  // };

  const handleOptionSelect = (option) => {
    setSelectedOption(option); // Update selected option when user clicks on an option
  };

  const handleSubmit = () => {
    const selectedOptionData = { selected: selectedOption };
    console.log(selectedOption)
    axios.post("http://127.0.0.1:8000/core/submit/", selectedOptionData, { 
      headers: { "Authorization": `token ${localStorage.getItem('token')}` } 
    })
    .then((res) => {
      setNextQuestion(!nextQuestion); // Trigger next question fetching
      fetchQuestion();
      setSelectedOption(""); // Reset selected option after submission
      // console.log(nextQuestion)
      // console.log("Post successful")
      // console.log(res)

    })
    .catch(error => {
      console.error('Error submitting option:', error);
    });
  };

  return (
    <div className="mt-20">
      {isError && <div>Error fetching question.</div>}
      {myData.question_data && (
        <div className="h-[40vh] w-[50vw] bg-gradient-to-r from-indigo-600 to-cyan-600 flex border border-black rounded-xl p-4 bg-opacity-10">
          <div className="text-xl font-bold overflow-y-auto text-slate-100">
            <span className="font-bold text-xl ">Q1 :-</span>
            <br />
            {myData.question_data.question_md}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-10 w-[50vw] ">
        {myData.question_data && (
          <>
            <button
              id="a"
              type="button"
              className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 ${selectedOption === 'a' ? 'bg-blue-600' : ''}`}
              onClick={() => handleOptionSelect("a")} // Call handleOptionSelect function with option 'a'
            >
              <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
                A
              </span>
              <span className="ml-2">{myData.question_data.a}</span>
            </button>
            <button
              id="b"
              type="button"
              className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 ${selectedOption === 'b' ? 'bg-blue-600' : ''}`}
              onClick={() => handleOptionSelect("b")} // Call handleOptionSelect function with option 'b'
            >
              <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
                B
              </span>
              <span className="ml-2">{myData.question_data.b}</span>
            </button>
            <button
              id="c"
              type="button"
              className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 ${selectedOption === 'c' ? 'bg-blue-600' : ''}`}
              onClick={() => handleOptionSelect("c")} // Call handleOptionSelect function with option 'c'
            >
              <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
                C
              </span>
              <span className="ml-2">{myData.question_data.c}</span>
            </button>
            <button
              id="d"
              type="button"
              className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 ${selectedOption === 'd' ? 'bg-blue-600' : ''}`}
              onClick={() => handleOptionSelect("d")} // Call handleOptionSelect function with option 'd'
            >
              <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
                D
              </span>
              <span className="ml-2">{myData.question_data.d}</span>
            </button>
          </>
        )}
      </div>
      <div className="align-middle justify-center relative flex mt-10"> 
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleSubmit}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

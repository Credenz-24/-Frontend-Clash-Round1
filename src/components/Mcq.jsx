import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import Graph from "./Graph";
import GPT_Modal from "./GPT_Modal";
import Time from "./Time";

import {
  getCurrentQuestion,
  submitData,
  skipQuestion,
  requestAudiencePollLifeline,
  useGptLifeline,
  useStreakLifeline,
  getAllLifelines,
} from "../../axios/api";
import Battery from "./Battery";
import Streak_Modal from "./Streak_Modal";
import { toast } from "react-toastify";

export default function Questions() {
  const [myData, setMyData] = useState({}); //Current_question Data
  const [isError, setIsError] = useState(false); //Error Handling
  const [nextQuestion, setNextQuestion] = useState(false); //Next Question
  const [selectedOption, setSelectedOption] = useState(""); //Option selection
  const [showModal, setShowModal] = useState(false); //Modal showing
  const [modalData, setModalData] = useState({}); //Data to show in modal
  const [audiencePollData, setAudiencePollData] = useState({}); //Audience poll data
  const [audiencePollVisible, setAudiencePollVisible] = useState(false); //Audience poll visibility
  const [fetchLifeline, setFetchLifeline] = useState({}); //all Lifeline fetching
  const [handleStreak, setHandleStreak] = useState(false); //streak lifeline eligible or not
  const [streakLifelineData, setStreakLifelineData] = useState({}); //streak lifelinedata
  const [showStreakLifelinedata, setShowStreakLifelinedata] = useState(false);
  const [gptSelected, setGptSelected] = useState(false); //gpt eligible or not
  const [dataGPT, setdataGPT] = useState(""); //gpt lifeline input
  const [botResponse, setBotResponse] = useState(""); //response from gpt lifeline
  const [showGPTModal, setShowGPTModal] = useState(false); //Shows gpt modal
  const [showStreakModal, setShowStreakModal] = useState(false); //Shows streak lifeline modal
  const [timer, setTimer] = useState(0); //fetchtimer
  // const [activeLifeline , setActiveLifeline] = useState(false);
  const [hrs, setHrs] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);

  const navigate = useNavigate();
  const apiUrl = 'https://api.clash.credenz.in/core/tab_switch/';

  //Tab_Switching 
  //const [tabSwitchCount, setTabSwitchCount] = useState(0);

  // const handleEvent = async (eventType) => {
  //     try {
  //         const token = localStorage.getItem('token');
  //         const response = await axios.post(apiUrl, {
  //             bool: eventType === 'tabSwitch'
  //         }, {
  //             headers: {
  //                 Authorization: `${token}`,
  //             }
  //         });
  //         if (response.status === 200) {
  //             const { message, count } = response.data;
  //             console.log('API response:', message, count);
  //             setTabSwitchCount(count);
  //             if (count > 3) {
  //               navigate("/result")
  //               toast.error('Your test has been auto-submitted due to excessive tab switching.');
  //           }
  //             else if (count > 0) {
  //                 toast.warning(`Warning: You have switched tabs ${count} times. Switching again may cause your test to be auto-submitted.`);
  //             }
  //         } else if (response.status === 307) {
  //             const { message } = response.data;
  //             if (message === 'time over') {
  //                 toast.error('Time is over. Your test has been submitted.');
  //             } else if (message === 'submitted') {
  //                 toast.error('Your test has been auto-submitted due to excessive tab switching.');
  //             }
  //         }
  //     } catch (error) {
  //         console.error('Error handling event:', error);
  //         handleSubmit()
  //         toast.error('An error occurred. Please try again.');
  //     }
  // };
  // useEffect(() => {
  //     const handleFullscreenChange = () => {
  //         if (!document.fullscreenElement) {
  //             handleEvent('fullscreenExit');
  //         }
  //     };
  //     document.addEventListener('fullscreenchange', handleFullscreenChange);
  //     const handleVisibilityChange = () => {
  //         if (document.visibilityState === 'hidden') {
  //             handleEvent('tabSwitch');
  //         }
  //     };
  //     document.addEventListener('visibilitychange', handleVisibilityChange);
  //     return () => {
  //         document.removeEventListener('fullscreenchange', handleFullscreenChange);
  //         document.removeEventListener('visibilitychange', handleVisibilityChange);
  //     };
  // }, []);



  const handleOptionSelect = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? "" : option));
  };

  const gptData = (event) => {
    event.preventDefault();
    setdataGPT(event.target.value);
  };

  const openGPTModal = () => {
    setShowGPTModal(true);
  };

  const closeGPTModal = () => {
    setShowGPTModal(false);
    fetchLifelines();
  };

  const closeStreakModal = () => {
    setShowStreakModal(false);
    fetchLifelines();
  };

  const fetchTimerValue = async () => {
    try {
      const response = await axios.get("https://api.clash.credenz.in/core/current_question/", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      //console.log(token);
      setTimer(response.data.time_remaining);
      console.log("timer",response.data.time_remaining);
    } catch (error) {
      if (error.response && error.response.status === 307) {
         //navigate('/result');
      } else {
        console.error("Error fetching timer value:", error);
      }
    }
  };

  useEffect(() => { 
    fetchQuestion();
    fetchLifelines();
    setNextQuestion(false);
    setAudiencePollVisible(false);
    setShowStreakLifelinedata(false);
    setGptSelected(false);
  }, []);

  // useEffect(() => {
  //   fetchTimerValue();
  // }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(timerInterval);
         navigate('/result');
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timer]);


  useEffect(() => {
    fetchLifelines();
  },[fetchLifeline?.available?.skip]);

 

  const fetchLifelines = async () => {
    try {
      const response = await axios.get(
        "https://api.clash.credenz.in/core/all_lifelines/",
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      
      setFetchLifeline(response.data);
      setIsError(false);
      console.log("All lifelines",response.data);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching lifeline:", error);
    }
  };
  // console.log("123",localStorage.getItem("token"));
  //Fetch Question from current_question/
  const fetchQuestion = async () => {
    try {
      const response = await axios.get(
        "https://api.clash.credenz.in/core/current_question/",
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      setMyData(response.data);
      //console.log("questions",response.data.question_data.question_md)
      setIsError(false);
      setTimer(response.data.time_remaining);
      setdataGPT("");
      console.log("res fetch question: ", response.data);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching question:", error);
    }
  };

  //Submit a question to submit/
  const handleSubmit = () => {
    if(selectedOption === ""){
      toast.error("Choose an Option!");
      return;
    }
    const selectedOptionData = { selected: selectedOption };

    // const loadingToastId = toast.loading("Loading Next Questions!");
    axios
      .post("https://api.clash.credenz.in/core/submit/", selectedOptionData, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // toast.dismiss(loadingToastId);
        fetchQuestion();
        fetchLifelines();
        setSelectedOption("");
        setAudiencePollVisible(false);
        setGptSelected(false);
        setdataGPT("");
        setShowStreakLifelinedata(false);
        setBotResponse("");

      })
      .catch((error) => {
        console.log("res handlesubmit:", error.response.status,typeof(error.response.status));
        if(error.response.status === 307 || error.response.status === 500){
          // toast.dismiss(loadingToastId);
          navigate('/result');
          toast.info("Round Ended!")
        }
        console.error("Error submitting option:", error);
        toast.error(error);
      });
  };

  //Skip a Question lifeline from skip_question/
  const handleSkipQuestion = async () => {
    setShowModal(true);
    try {
      axios
        .get("https://api.clash.credenz.in/core/skip_question/", {
          headers: { Authorization:`${localStorage.getItem("token")}` },
        })
        .then((response) => {
          console.log("Question skipped successfully");
          console.log(response.data);
          setMyData(response.data);
          toast.success("Question skipped successfully");
          fetchQuestion();
          fetchLifelines();
          setAudiencePollVisible(false);
          setGptSelected(false);
          setdataGPT("");
          setShowStreakLifelinedata(false);
          setBotResponse("");
          setFetchLifeline((prevState) => ({ ...prevState, skip: false }));
        })
        .catch((error) => {
          console.error("Error skipping question:", error);
          toast.dismiss(loadingToastId);
        });
    } catch (error) {
      console.error("Error skipping question:", error);
      toast.dismiss(loadingToastId);
    }
  };

  //Use gemini gpt/
  const handleGPT = async () => {
    setShowGPTModal(true);
    setdataGPT(myData.question_data.question_md);

    console.log("shmdl" , showModal);
    console.log(fetchLifeline.in_use.gpt,"Lifeline msg")
 
    if(fetchLifeline?.in_use.gpt){
      console.log("Using gpt")
        axios
        .get(
          "https://api.clash.credenz.in/core/gpt/",
          // { message: dataGPT },
          {
            headers: { Authorization:`${localStorage.getItem("token")}` },
          }
        )
        .then((response) => {
          console.log("errstatus",response);
          console.log("GPT");
          setFetchLifeline((prevState) => ({ ...prevState, gpt: false }));
          setGptSelected(false);
          console.log(response.data);
          //setBotResponse(response.data.bot_message);
          // setShowModal(false);
          toast.dismiss();
          setShowGPTModal(true);
          setAudiencePollVisible(false);
          setGptSelected(true);
        })
        .catch((error) => {
          console.log("gpt ",error.response.status)
          if (error.response && error.response.status === 400) {
            setIsError(true);
            //setGptSelected(true);
            setShowGPTModal(true);
          } else {
            setIsError(true);
            console.error("Error fetching question:", error);
          }
          toast.dismiss();
        });
    }
    // else{
    //   const loadingToastId = toast.loading("Please Wait!");

    //   axios
    //     .post(
    //       "http://127.0.0.1:8000/core/gpt/",
    //       { message: dataGPT },
    //       {
    //         headers: {
    //           Authorization: `${localStorage.getItem("token")}`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       console.log("errstatus",response.data.status);
    //       console.log("GPT");
    //       setFetchLifeline((prevState) => ({ ...prevState, gpt: false }));
    //       setGptSelected(false);
    //       console.log(response.data);
    //       setPromptResponse(response.data.bot_message);
    //       // setShowModal(false);
    //       toast.dismiss(loadingToastId);
    //       setShowGPTModal(true);
    //       setAudiencePollVisible(false);
    //       setGptSelected(true);
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       if (error.response && error.response.status === 400) {
    //         setIsError(true);
    //         setGptSelected(true);
    //         setShowGPTModal(true);
    //       } else {
    //         setIsError(true);
    //         console.error("Error fetching question:", error);
    //       }
    //       toast.dismiss(loadingToastId);
    //     });
    // }
    
  };

  //Use streak lifeline from /streak_lifeline
  const handleStreakLifeline = async () => {
    // setShowModal(true);
    // const loadingToastId = toast.loading("Please Wait!");
    try {
      axios
        .get("https://api.clash.credenz.in/core/streak_lifeline/", {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        })
        .then((response) => {
          console.log("Streak");
          console.log(response.data);
          setHandleStreak(true);
          setStreakLifelineData(response.data);
          toast.dismiss();
          setShowStreakLifelinedata(true);
          setAudiencePollVisible(false);
          setShowStreakModal(true);
          setBotResponse("");
          setFetchLifeline((prevState) => ({ ...prevState, streak: false }));
        })
        .catch((error) => {
          console.error("Error streak lifeline", error);
          toast.dismiss();
        });
    } catch (error) {
      console.error("Error streak lifeline", error);
      toast.dismiss();
    }
  };

  //use AudiencePoll from audiance_poll/
  const handleAudiencePoll = async () => {
    setShowModal(true);
    const loadingToastId = toast.loading("Please Wait!");
    try {
      axios
        .get("https://api.clash.credenz.in/core/audiance_poll/", {
          headers: { Authorization: ` ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          console.log("Audience");
          console.log(response.data);
          setAudiencePollData(response.data.correct_answer_percentages);
          setAudiencePollVisible(true);
          toast.dismiss();
          setBotResponse("");
          setFetchLifeline((prevState) => ({ ...prevState, audiance: false }));
          fetchLifelines();
        })
        .catch((error) => {
          console.error("Error skipping question:", error);
          toast.dismiss();
        });
    } catch (error) {
      console.error("Error skipping question:", error);
      toast.dismiss();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const openModal = (modalData) => {
    // fetchLifelines();
    setModalData(modalData);
    setShowModal(true);
  };

  // Handle closing of modal
  const closeModal = () => {
    fetchLifelines();
    setShowModal(false);
  };

  useEffect(() => {}, [nextQuestion]);

  return (
    <>
      <div className="mt-2">
      <div className="text-white bg-green- flex flex-row justify-between relative">
  <span className="border border-[#0075FF] rounded-lg p-4 mb-2 font-bold text-lg">Q {myData.question_level}</span>
  <span className="border border-[#0075FF] rounded-lg p-4 mb-2">Timer: {formatTime(timer)} minutes</span>
</div>

        {myData.question_data && (
          <div className="h-[40vh] w-[50vw] flex border border-[#0075FF] rounded-xl p-4 bg-opacity-10">
            <div className="text-xl font-bold overflow-y-auto text-slate-100 w-full scrollbar-thin scrollbar-webkit">
              <span className="font-bold text-xl"></span>
              <pre
              className=""
                style={{
                  whiteSpace: 'pre-wrap',
                  scrollbarColor: "gray black",
                  WebkitScrollbar: { width: "10px", backgroundColor: "black" },
                  scrollbarWidth: "thin"
                }}
                >
                  {myData.question_data.question_md}
              </pre>
              
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-10 w-[50vw] ">
          {myData.question_data && (
            <>
              <button
                id="a"
                type="button"
                className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 ${
                  selectedOption === "a" ? "bg-blue-600" : ""
                }`}
                onClick={() => handleOptionSelect("a")}
              >
                <span className="inline-flex items-center justify-center min-w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
                  A
                </span>
                <span className="ml-2">{myData.question_data.a}</span>
              </button>
              <button
                id="b"
                type="button"
                className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 ${
                  selectedOption === "b" ? "bg-blue-600" : ""
                }`}
                onClick={() => handleOptionSelect("b")}
              >
                <span className="inline-flex items-center justify-center min-w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
                  B
                </span>
                <span className="ml-2">{myData.question_data.b}</span>
              </button>
              <button
                id="c"
                type="button"
                className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 ${
                  selectedOption === "c" ? "bg-blue-600" : ""
                }`}
                onClick={() => handleOptionSelect("c")}
              >
                <span className="inline-flex items-center justify-center min-w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
                  C
                </span>
                <span className="ml-2">{myData.question_data.c}</span>
              </button>
              <button
                id="d"
                type="button"
                className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 ${
                  selectedOption === "d" ? "bg-blue-600" : ""
                }`}
                onClick={() => handleOptionSelect("d")}
              >
                <span className="inline-flex items-center justify-center min-w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
                  D
                </span>
                <span className="ml-2">{myData.question_data.d}</span>
              </button>
            </>
          )}
        </div>
        {/* <Graph/> */}
        <div className="align-middle justify-center relative flex mt-6
        ">
          <button
            type="button"
            // disabled={!selectedOption}
            //className="py-2.5 px-5 me-2 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
             className="text-black font-bold uppercase transition-all duration-[0.3s] relative overflow-hidden z-[1] px-5 py-3 rounded-[10rem] after:content-[''] after:absolute after:w-full after:h-full after:bg-[#0075FF] after:z-[-2] after:rounded-[10rem] after:left-0 after:bottom-0 before:content-[''] before:absolute before:w-[0%] before:h-full before:bg-[#08a] before:transition-all before:duration-[0.3s] before:z-[-1] before:rounded-[10rem] before:left-0 before:bottom-0 hover:text-white hover:before:w-full mx-2"
            onClick={handleSubmit}
          >
            NEXT
          </button>
          {/* {selectedOption === "" && toast.error("Choose A Option!")} */}
        </div>
      </div>

      <div className="flex ml-[12%]">
        <div className="max-w-2xl mx-4 text-white sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto m-16 shadow-xl rounded-lg border-[#0075FF]h-[49vh] w-[26vw] ">
          <div className="flex">
            <div className="h-14 overflow-hidden m-4 mr-2 w-[50%]">
              <div className="text-center border border-[#0075FF] rounded-lg">
                Score
                <div>{myData.score}</div>
              </div>
            </div>
            <div className="h-14 overflow-hidden m-4 ml-2 w-[50%] rounded-lg">
              <div className="text-center border border-[#0075FF] rounded-lg ">
                Username
                <div>{myData.username}</div>
              </div>
            </div>
          </div>
          <div className="h-12 overflow-hidden mr-4 ml-4 flex border border-[#0075FF] rounded-lg">
            <div className="w-[73%] m-2 text-center">
              Current Streak
            </div>
            <div className="w-[20%] mr-2 mt-2 mb-2 text-center">
              {/* {myData.streak} */}
              <Battery streak={myData.streak} />
            </div>
          </div>
          <div className="h-12 overflow-hidden mr-4 ml-4 flex mt-4 border border-[#0075FF] rounded-lg">
            <div className="w-[67%] m-2 text-center ">
              Marking Scheme
            </div>
            {myData.scheme && (
              <>
                <div className="w-[12%] mr-2 mt-2 mb-2 text-center">
                  +{myData.scheme.positive}
                </div>
                <div className="w-[12%] mr-2 mt-2 mb-2 text-center">
                  {myData.scheme.negative}
                </div>
              </>
            )}
          </div>
          <div className="m-4 flex flex-col items-center justify-center gap-y-4">
            {/* {console.log("skip" ,fetchLifeline?.available?.skip)} */}
            <button
              disabled={!fetchLifeline?.available?.skip}
              className={`flex items-center justify-center rounded-lg h-10 mt-2 w-[100%] text-center overflow-hidden ${
                !fetchLifeline?.available?.skip
                ? "border border-red-400 text-gray-400 cursor-not-allowed"
                : "text-white border border-[#0075FF] bg-[#0075FF] bg-opacity-20"
              }`}
              onClick={() =>{
                openModal({ type: "skip", lifelineIns: "The Skip Lifeline grants the player the option to bypass the current question without providing an answer.Upon activation, the current question will be substituted with a new one" })
              }
                
              }
            >
              Skip Question
            </button>
            
            {/* {console.log("audypoll" ,fetchLifeline?.available?.audience)}
            {console.log("audypollin_use" ,fetchLifeline?.in_use?.audience)} */}

              <button
              disabled={!fetchLifeline?.available?.audience ^ fetchLifeline?.in_use?.audience }
              className={`flex items-center justify-center rounded-lg h-10 mt-2 w-full text-center overflow-hidden ${
                !fetchLifeline?.available?.audience ^ fetchLifeline?.in_use?.audience
                ? "border border-red-400 text-gray-400 cursor-not-allowed"
                : "text-white border border-[#0075FF] bg-[#0075FF] bg-opacity-20"
              }`}
              onClick={() =>
                openModal({
                  type: "audiencePoll",
                  lifelineIns: "The Audience Poll lifeline allows players to seek assistance from the collective wisdom of the audience. Upon activation, players receive a graphical representation of most probable option",
                })
              }
            >
               {/* <img src="./polling.png" className="w-[20%] h-6"/> */}
              Audience Poll
            </button>
          
            

            <button
              disabled={!fetchLifeline?.available?.gpt ^fetchLifeline?.in_use?.gpt }
              className={`flex items-center justify-center rounded-lg h-10 mt-2 w-[100%] text-center overflow-hidden ${
                !fetchLifeline?.available?.gpt ^fetchLifeline?.in_use?.gpt
                ? "border border-red-400 text-gray-400 cursor-not-allowed"
                : "text-white border border-[#0075FF] bg-[#0075FF] bg-opacity-20"
              }`}
              onClick={() =>
                { fetchLifeline.in_use.gpt ? handleGPT():

                 openModal({ type: "GPT", lifelineIns: "The AI Helper lifeline empowers players to utilize artificial intelligence to procure answers. By activating this lifeline, players gain access to an AI-driven tool for obtaining response" })}}
          >
              AI Helper
            </button>

            <button
              disabled={!fetchLifeline?.available?.streak ^fetchLifeline?.in_use?.streak }
              className={`flex items-center justify-center rounded-lg h-10 mt-2 w-[100%] text-center overflow-hidden ${
                !fetchLifeline?.available?.streak ^fetchLifeline?.in_use?.streak
                ? "border border-red-400 text-gray-400 cursor-not-allowed"
                : "text-white border border-[#0075FF] bg-[#0075FF] bg-opacity-20"
              }`}
              onClick={() =>
                // { fetchLifeline.in_use.streak ? handleStreakLifeline():
                openModal({ type: "streak", lifelineIns: "The Streak Lifeline awards players who achieve a consecutive streak of four correct answers by revealing a Caesar Cipher codeword for the subsequent question. Answer is obtained in encoded form" })
              // }
            }
            >
              Streak Lifeline
            </button>
          </div>
          {/* {audiencePollVisible && <Graph data={audiencePollData} />} */}
          {/* {handleStreak && showStreakLifelinedata && <div className="text-white h-auto m-10">Encode the data!<p>{streakLifelineData.Encoded_data.encoded_data}</p><p>{streakLifelineData.Encoded_data.from_to}</p></div>} */}
          {showGPTModal && (
            <GPT_Modal
              
              onClose={closeGPTModal}
              inputValue={dataGPT}
              onChange={gptData}
              onConfirm={handleGPT}
              // response={botResponse}
              question={myData.question_data.question_md}
              in_use = {fetchLifeline?.in_use?.gpt}
            />
          )}
    

          {handleStreak && showStreakLifelinedata && showStreakModal && (
            <Streak_Modal
              onClose={closeStreakModal}
              data1={streakLifelineData.Encoded_data.encoded_data}
              data2={streakLifelineData.Encoded_data.from_to}
            />
          )}
          {/* {handleStreak && showStreakLifelinedata && !showStreakModal && (
            <div className="text-white h-auto m-10">
              Encode the data!
              <p>{streakLifelineData.Encoded_data.encoded_data}</p>
              <p>{streakLifelineData.Encoded_data.from_to}</p>
            </div>
          )} */}
        </div>
      </div>
      
      {showModal && (
        <Modal
          lifelineIns={modalData.lifelineIns}
          type={modalData.type}
          onClose={closeModal}
          onSkipQuestion={handleSkipQuestion}
          onGPT={handleGPT}
          onStreakLifeline={handleStreakLifeline}
          onAudiencePoll={handleAudiencePoll}
          audiencePollData={audiencePollData}
          in_use_audience = {fetchLifeline?.in_use?.audience}
          in_use_gpt = {fetchLifeline?.in_use?.gpt}
          in_use_streak = {fetchLifeline?.in_use?.streak}
          available={fetchLifeline?.in_use}
          
        />
      )}
    </>
  );
}

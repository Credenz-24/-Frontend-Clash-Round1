import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import Graph from "./Graph";
import GPT_Modal from "./GPT_Modal";
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

  const navigate = useNavigate();

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
  };

  const closeStreakModal = () => {
    setShowStreakModal(false);
  };

  const fetchTimerValue = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/core/current_question/", {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      });
      setTimer(response.data.time_remaining);
    } catch (error) {
      if (error.response && error.response.status === 307) {
        navigate('/result');
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

  useEffect(() => {
    fetchTimerValue();
  }, []);

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


 

  const fetchLifelines = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/core/all_lifelines/",
        {
          headers: { Authorization: `token ${localStorage.getItem("token")}` },
        }
      );
      setFetchLifeline(response.data);
      setIsError(false);
      console.log(response.data);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching question:", error);
    }
  };

  //Fetch Question from current_question/
  const fetchQuestion = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/core/current_question/",
        {
          headers: { Authorization: `token ${localStorage.getItem("token")}` },
        }
      );
      setMyData(response.data);
      setIsError(false);
      setdataGPT("");
      console.log("res fetch question: ", response.data);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching question:", error);
    }
  };

  //Submit a question to submit/
  const handleSubmit = () => {
    const selectedOptionData = { selected: selectedOption };
    axios
      .post("http://127.0.0.1:8000/core/submit/", selectedOptionData, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log("res handlesubmit:", res);
        fetchQuestion();
        setSelectedOption("");
        setAudiencePollVisible(false);
        setGptSelected(false);
        setdataGPT("");
        setShowStreakLifelinedata(false);
        setBotResponse("");
        if(res.data.message === "question over"){
          navigate('/result');
        }
      })
      .catch((error) => {
        console.error("Error submitting option:", error);
      });
  };

  //Skip a Question lifeline from skip_question/
  const handleSkipQuestion = async () => {
    setShowModal(true);
    try {
      axios
        .get("http://127.0.0.1:8000/core/skip_question/", {
          headers: { Authorization: `token ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          console.log("Question skipped successfully");
          console.log(response.data);
          setMyData(response.data);
          fetchQuestion();
          setAudiencePollVisible(false);
          setGptSelected(false);
          setdataGPT("");
          setShowStreakLifelinedata(false);
          setBotResponse("");
          setFetchLifeline((prevState) => ({ ...prevState, skip: false }));
        })
        .catch((error) => {
          console.error("Error skipping question:", error);
        });
    } catch (error) {
      console.error("Error skipping question:", error);
    }
  };

  //Use gemini gpt/
  const handleGPT = async () => {
    if (showGPTModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
    try {
      axios
        .post(
          "http://127.0.0.1:8000/core/gpt/",
          { message: dataGPT },
          {
            headers: {
              Authorization: `token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log("GPT");
          setFetchLifeline((prevState) => ({ ...prevState, gpt: false }));
          setGptSelected(false);
          console.log(response.data);
          setBotResponse(response.data.bot_message);
          setShowModal(false);
          setShowGPTModal(true);
          setAudiencePollVisible(false);
          setGptSelected(true);
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setIsError(true);
            setGptSelected(true);
            setShowGPTModal(true);
          } else {
            setIsError(true);
            console.error("Error fetching question:", error);
          }
        });
    } catch (error) {
      console.error("Error skipping question:", error);
    }
  };

  //Use streak lifeline from /streak_lifeline
  const handleStreakLifeline = async () => {
    setShowModal(true);
    try {
      axios
        .get("http://127.0.0.1:8000/core/streak_lifeline/", {
          headers: { Authorization: `token ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          console.log("Streak");
          console.log(response.data);
          setHandleStreak(true);
          setStreakLifelineData(response.data);
          setShowStreakLifelinedata(true);
          setAudiencePollVisible(false);
          setShowStreakModal(true);
          setBotResponse("");
          setFetchLifeline((prevState) => ({ ...prevState, streak: false }));
        })
        .catch((error) => {
          console.error("Error skipping question:", error);
        });
    } catch (error) {
      console.error("Error skipping question:", error);
    }
  };

  //use AudiencePoll from audiance_poll/
  const handleAudiencePoll = async () => {
    setShowModal(true);
    try {
      axios
        .get("http://127.0.0.1:8000/core/audiance_poll/", {
          headers: { Authorization: `token ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          console.log("Audience");
          console.log(response.data);
          setAudiencePollData(response.data.correct_answer_percentages);
          setAudiencePollVisible(true);
          setBotResponse("");
          setFetchLifeline((prevState) => ({ ...prevState, audiance: false }));
        })
        .catch((error) => {
          console.error("Error skipping question:", error);
        });
    } catch (error) {
      console.error("Error skipping question:", error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const openModal = (modalData) => {
    setModalData(modalData);
    setShowModal(true);
  };

  // Handle closing of modal
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {}, [nextQuestion]);

  return (
    <>
      <div className="mt-12">
      <div className="text-white">Timer: {formatTime(timer)} minutes</div>
        {isError && <div>Error fetching question.</div>}
        {myData.question_data && (
          <div className="h-[40vh] w-[50vw] bg-gradient-to-r from-indigo-600 to-cyan-600 flex border border-black rounded-xl p-4 bg-opacity-10">
            <div className="text-xl font-bold overflow-y-auto text-slate-100">
              <span className="font-bold text-xl "></span>
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
                className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 ${
                  selectedOption === "a" ? "bg-blue-600" : ""
                }`}
                onClick={() => handleOptionSelect("a")}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
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
                <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
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
                <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
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
                <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
                  D
                </span>
                <span className="ml-2">{myData.question_data.d}</span>
              </button>
            </>
          )}
        </div>
        {/* <Graph/> */}
        <div className="align-middle justify-center relative flex mt-12">
          <button
            type="button"
            disabled={!selectedOption}
            className="py-2.5 px-5 me-2 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={handleSubmit}
          >
            NEXT
          </button>
        </div>
      </div>

      <div className="flex ml-[12%] mt-[-3%]">
        <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto m-16 bg-gradient-to-r from-indigo-600 to-cyan-600 shadow-xl rounded-lg text-gray-900 h-[49vh] w-[26vw]">
          <div className="flex">
            <div className="h-14 overflow-hidden bg-slate-100 m-4 mr-2 w-[50%]">
              <div className="text-center">
                Score
                <div>{myData.score}</div>
              </div>
            </div>
            <div className="h-14 overflow-hidden bg-slate-100 m-4 ml-2 w-[50%]">
              <div className="text-center">
                Username
                <div>{myData.username}</div>
              </div>
            </div>
          </div>
          <div className="h-12 overflow-hidden bg-slate-100 mr-4 ml-4 flex">
            <div className="w-[73%] bg-slate-200 m-2 text-center">
              Current Streak
            </div>
            <div className="w-[20%] bg-slate-200 mr-2 mt-2 mb-2 text-center">
              {/* {myData.streak} */}
              <Battery streak={myData.streak} />
            </div>
          </div>
          <div className="h-12 overflow-hidden bg-slate-100 mr-4 ml-4 flex mt-4">
            <div className="w-[67%] bg-slate-200 m-2 text-center">
              Marking Scheme
            </div>
            {myData.scheme && (
              <>
                <div className="w-[12%] bg-slate-200 mr-2 mt-2 mb-2 text-center">
                  {myData.scheme.positive}
                </div>
                <div className="w-[12%] bg-slate-200 mr-2 mt-2 mb-2 text-center">
                  {myData.scheme.negative}
                </div>
              </>
            )}
          </div>
          <div className="bg-slate-100 m-4 flex flex-col items-center justify-center">
            <button
              disabled={!fetchLifeline.skip}
              className={`flex items-center justify-center h-auto mt-2 w-[60%] sm:w-[50%] md:w-[45%] text-center overflow-hidden ${
                fetchLifeline.skip
                  ? "bg-slate-400 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              onClick={() =>
                openModal({ type: "skip", lifelineIns: "Skip Question" })
              }
            >
              Skip Question
            </button>

            <button
              disabled={!fetchLifeline.audiance}
              className={`flex items-center justify-center h-auto mt-2 w-[60%] sm:w-[50%] md:w-[45%] text-center overflow-hidden ${
                fetchLifeline.audiance
                  ? "bg-slate-400 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              onClick={() =>
                openModal({
                  type: "audiencePoll",
                  lifelineIns: "Audience Poll",
                })
              }
            >
              Audience Poll
            </button>

            <button
              disabled={!fetchLifeline.gpt}
              className={`flex items-center justify-center h-auto mt-2 w-[60%] sm:w-[50%] md:w-[45%] text-center overflow-hidden ${
                fetchLifeline.gpt
                  ? "bg-slate-400 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              onClick={() => openModal({ type: "GPT", lifelineIns: "GPT" })}
            >
              GPT
            </button>

            <button
              disabled={!fetchLifeline.streak}
              className={`flex items-center justify-center h-auto mt-2 w-[60%] sm:w-[50%] md:w-[45%] text-center overflow-hidden ${
                fetchLifeline.streak
                  ? "bg-slate-400 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              onClick={() =>
                openModal({ type: "streak", lifelineIns: "Streak Lifeline" })
              }
            >
              Streak Lifeline
            </button>
          </div>
          {audiencePollVisible && <Graph data={audiencePollData} />}
          {/* {handleStreak && showStreakLifelinedata && <div className="text-white h-auto m-10">Encode the data!<p>{streakLifelineData.Encoded_data.encoded_data}</p><p>{streakLifelineData.Encoded_data.from_to}</p></div>} */}
          {showGPTModal && (
            <GPT_Modal
              onClose={closeGPTModal}
              inputValue={dataGPT}
              onChange={gptData}
              onConfirm={handleGPT}
              response={botResponse}
            />
          )}
          {!showGPTModal && gptSelected && botResponse && (
            <div className="text-white mt-10">
              <p>Answer to your question:</p>
              {botResponse}
            </div>
          )}

          {handleStreak && showStreakLifelinedata && showStreakModal && (
            <Streak_Modal
              onClose={closeStreakModal}
              data1={streakLifelineData.Encoded_data.encoded_data}
              data2={streakLifelineData.Encoded_data.from_to}
            />
          )}
          {handleStreak && showStreakLifelinedata && !showStreakModal && (
            <div className="text-white h-auto m-10">
              Encode the data!
              <p>{streakLifelineData.Encoded_data.encoded_data}</p>
              <p>{streakLifelineData.Encoded_data.from_to}</p>
            </div>
          )}
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
        />
      )}
    </>
  );
}

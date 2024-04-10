import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Graph from "./Graph"
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

export default function Questions() {
  const [myData, setMyData] = useState({});
  const [isError, setIsError] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalButton, setModalButton] = useState(false);
  const [modalData, setModalData] = useState({});
  const [audiencePollData, setAudiencePollData] = useState({});
  const [audiencePollVisible, setAudiencePollVisible] = useState(false);
  const [fetchLifeline, setFetchLifeline] = useState({});

  const handleOptionSelect = (option) => {
    setSelectedOption(prevOption => prevOption === option ? "" : option);

  };

  useEffect(() => {
    fetchQuestion();
    fetchLifelines();
    setNextQuestion(false);
    setAudiencePollVisible(false);
    
  }, []);


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
      console.log(response.data);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching question:", error);
    }
  };

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
        })
        .catch((error) => {
          console.error("Error skipping question:", error);
        });
    } catch (error) {
      console.error("Error skipping question:", error);
    }
  };

  const handleSubmit = () => {
    const selectedOptionData = { selected: selectedOption };
    axios
      .post("http://127.0.0.1:8000/core/submit/", selectedOptionData, {
        headers: { Authorization: `token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setNextQuestion(!nextQuestion);
        fetchQuestion();
        setSelectedOption("");
        setAudiencePollVisible(false);
      })
      .catch((error) => {
        console.error("Error submitting option:", error);
      });
  };

  const handleGPT = async () => {
    setShowModal(true);
    try {
      axios
        .get("http://127.0.0.1:8000/core/gpt/", {
          headers: { Authorization: `token ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          console.log("GPT");
          console.log(response.data);
          //fetchQuestion();
        })
        .catch((error) => {
          console.error("Error skipping question:", error);
        });
    } catch (error) {
      console.error("Error skipping question:", error);
    }
  };

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
          //fetchQuestion();
        })
        .catch((error) => {
          console.error("Error skipping question:", error);
        });
    } catch (error) {
      console.error("Error skipping question:", error);
    }
  };

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
  return (
    <>
      <div className="mt-12">
        <div className="text-white">
          Timer:{" "}
          {`${
            myData.time_remaining && formatTime(myData.time_remaining)
          } minutes`}
        </div>
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
            className="py-2.5 px-5 me-2 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={handleSubmit}
          >
            NEXT
          </button>
        </div>
      </div>
      
      <div className="flex ml-[12%] mt-[-3%]">
        
        {isError && <div>Error fetching question.</div>}
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
            {fetchLifeline.skip && <button
              className="flex items-center justify-center h-auto mt-2 w-[60%] sm:w-[50%] md:w-[45%] bg-slate-400 text-center overflow-hidden"
              onClick={() => openModal({ type: "skip", lifelineIns: "A" })}
            >
              Skip Question
            </button>}
            {fetchLifeline.audiance &&
            <button
              className="flex items-center justify-center h-auto mt-2 w-[60%] sm:w-[50%] md:w-[45%] bg-slate-400 text-center overflow-hidden"
              onClick={() =>
                openModal({ type: "audiencePoll", lifelineIns: "B" })
              }
            >
              Audience Poll
            </button>}
            {fetchLifeline.gpt && <button
              className="flex items-center justify-center h-auto mt-2 w-[60%] sm:w-[50%] md:w-[45%] bg-slate-400 text-center overflow-hidden"
              onClick={() => openModal({ type: "GPT", lifelineIns: "C" })}
            >
              GPT
            </button>}
            {fetchLifeline.streak && <button
              className="flex items-center justify-center h-auto mt-2 w-[60%] sm:w-[50%] md:w-[45%] bg-slate-400 text-center overflow-hidden"
              onClick={() => openModal({ type: "streak", lifelineIns: "D" })}
            >
              Streak Lifeline
            </button>}
            
          </div>
          {audiencePollVisible && <Graph data={audiencePollData} />}
        </div>
        <div className="text-white">{modalButton && "hello"}</div>
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

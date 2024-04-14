import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Instruction = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [acceptedConditions, setAcceptedConditions] = useState(false);

  const navigate = useNavigate();
    const InstructionArray = [
    {
      title: "INSTRUCTION 1",
      content: (
        <div className="text-center flex flex-col justify-center items-center ">
          <div className="list-decimal mb-4 bg-cyan-400 rounded-xl bg-opacity-50  rounded-custom shadow-custom p-4 flex h-[150px] w-[60vw]">
            <div className="number w-[10%] h-full bg-red-00 flex justify-center items-center">
              <button className="rounded-full bg-blue-200 w-[5vw] h-[5vw] font-bold text-xl text-black">
                  1
              </button>
            </div>
            <div className="para w-[90%] bg-green-00 flex justify-center items-center text-justify">
              <p className="mb-2">
                A 28 minute round of MCQs for individuals as well as a team (max
                2 people) contenders based on coding concepts in C/C++, Java, and
                Python, divided into Juniors and Seniors category.
              </p>
            </div>
          </div>
          
           
        </div>
      ),
    },
    {
      title: "LIFELINE 1",
      content: "LIFELINE1...",
    },
    {
      title: "LIFELINE 2",
      content: "LIFELINE2...",
    },
    {
      title: "LIFELINE 3",
      content: "LIFELINE3...",
    },
  ];

  const handleNextClick = () => {
    if (currentStep < InstructionArray.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProceedClick = () => {
    if (acceptedConditions) {
      console.log("Proceeding...");
      navigate("/Question")
    } else {
      console.log("Please accept the conditions.");
    }
  };

  return (
    <>
      <div className="bg-red-500 flex justify-center items-center h-[86.4vh] w-[100%] relative overflow-y-hidden">
        <div className="container flex justify-center relative bg-green-600 ">
          <div className="shape relative overflow-hidden z-10 bg-gradient-to-br from-[#050048] to-[#050048] rounded-lg h-[80vh] w-[80vw] sm:h-[70vh] sm:w-[90vw] md:h-[80vh] md:w-[90vw] lg:h-[82vh] lg:w[90vw] xl:h-[78vh]">
            <div className="p-4 sm:p-4 md:p-8 lg:p-16 h-full">
              <div className=" flex align-middle justify-center flex-col relative h-[78%] sm:h-[78%] md:h-[84%] lg:h-[84%] items-center ">
                <div className="flex justify-center align-middle relative mb-4 text-center">
                  <span className="p-2 text-zinc-400 font-bold relative text-2xl align-top bottom-7">
                    {InstructionArray[currentStep].title}
                  </span>
                </div>
                <div
                  className="h-[70%] sm:h-[70%] md:h-[60%] lg:h-[100%]
                        text-slate-100 relative overflow-y-scroll no-scrollbar
                           font-semibold text-sm md:text-lg lg:text-[110%] text-center rounded-2xl"
                >
                  <div>{InstructionArray[currentStep].content}</div>
                </div>
              </div>
              <div className="flex justify-center mt-6 text-center mx-auto align-bottom">
                <div className="relative flex-row">
                  {currentStep !== 0 &&
                    currentStep !== InstructionArray.length - 1 && (
                      <button
                        className="text-black font-bold uppercase transition-all duration-[0.3s] relative overflow-hidden z-[1] px-5 py-3 rounded-[10rem] after:content-[''] after:absolute after:w-full after:h-full after:bg-[#0cf] after:z-[-2] after:rounded-[10rem] after:left-0 after:bottom-0 before:content-[''] before:absolute before:w-[0%] before:h-full before:bg-[#08a] before:transition-all before:duration-[0.3s] before:z-[-1] before:rounded-[10rem] before:left-0 before:bottom-0 hover:text-white hover:before:w-full"
                        onClick={handlePreviousClick}
                      >
                        Previous
                      </button>
                    )}
                  {currentStep !== InstructionArray.length - 1 && (
                    <button
                      className="text-black font-bold uppercase transition-all duration-[0.3s] relative overflow-hidden z-[1] px-5 py-3 rounded-[10rem] after:content-[''] after:absolute after:w-full after:h-full after:bg-[#0cf] after:z-[-2] after:rounded-[10rem] after:left-0 after:bottom-0 before:content-[''] before:absolute before:w-[0%] before:h-full before:bg-[#08a] before:transition-all before:duration-[0.3s] before:z-[-1] before:rounded-[10rem] before:left-0 before:bottom-0 hover:text-white hover:before:w-full mx-2"
                      onClick={handleNextClick}
                    >
                      Next
                    </button>
                  )}
                  {currentStep === InstructionArray.length - 1 && (
                    <div className="flex flex-col items-center">
                      <div className="flex mb-[16px] ">
                        <input
                          type="checkbox"
                          id="acceptConditions"
                          checked={acceptedConditions}
                          onChange={(e) =>
                            setAcceptedConditions(e.target.checked)
                          }
                        />
                        <label
                          htmlFor="acceptConditions"
                          className="ml-2 text-sm text-white sm:text-sm md:text-sm lg:text-md"
                        >
                          I AGREE TO THE INSTRUCTIONS
                        </label>
                      </div>
                      <div className="flex flex-row sm:flex-wrap">
                        <button
                          className="text-black font-bold uppercase transition-all duration-[0.3s] relative overflow-hidden z-[1] px-5 py-3 rounded-[10rem] after:content-[''] after:absolute after:w-full after:h-full after:bg-[#0cf] after:z-[-2] after:rounded-[10rem] after:left-0 after:bottom-0 before:content-[''] before:absolute before:w-[0%] before:h-full before:bg-[#08a] before:transition-all before:duration-[0.3s] before:z-[-1] before:rounded-[10rem] before:left-0 before:bottom-0 hover:text-white hover:before:w-full mx-2"
                          onClick={handlePreviousClick}
                        >
                          Previous
                        </button>
                        <button
                          className={`text-black font-bold uppercase transition-all duration-[0.3s] relative overflow-hidden z-[1] px-5 py-3 rounded-[10rem] after:content-[''] after:absolute after:w-full after:h-full after:bg-[#0cf] after:z-[-2] after:rounded-[10rem] after:left-0 after:bottom-0 before:content-[''] before:absolute before:w-[0%] before:h-full before:bg-[#08a] before:transition-all before:duration-[0.3s] before:z-[-1] before:rounded-[10rem] before:left-0 before:bottom-0 hover:text-white hover:before:w-full ${
                            !acceptedConditions
                              ? "bg-white cursor-not-allowed"
                              : ""
                          }`}
                          onClick={handleProceedClick}
                          hidden={!acceptedConditions}
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instruction;

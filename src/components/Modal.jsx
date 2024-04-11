import React, {useState } from "react";
import {useNavigate} from "react-router-dom"

export default function Modal({lifelineIns, type, onClose, onSkipQuestion, onGPT, onStreakLifeline, onAudiencePoll }) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    switch (type) {
      case "skip":
        onSkipQuestion();
        break;
      case "GPT":
        onGPT();
        break;
      case "streak":
        onStreakLifeline();
        break;
      case "audiencePoll":
        onAudiencePoll();
        break;
      default:
        console.error("Invalid lifeline type");
    }
    onClose();
  };
    
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto">
            {/* content */}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-900 outline-none focus:outline-none">
              {/* footer */}
              <div className="flex items-center justify-between pt-6 pl-6 pr-6 border-t border-solid border-blueGray-200 rounded-b">

  
                <button
                  className="bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded text-xl  border-[2.3px]"
                  type="button"
                  onClick={onClose}
                >
                  X
                </button>
              </div>
              <div
                className="text-white relative p-6 flex-auto h-[29vh] w-[50vw] max-h-[59vh] border-2 border-white m-6 resize-none overflow-y-scroll bg-slate-800"
                readOnly
                style={{
                  scrollbarColor: "gray black",
                  WebkitScrollbar: {
                    width:"10px",
                    backgroundColor: "black",
                  },
                  scrollbarWidth: "thin"
                }}>
                {lifelineIns}
                </div>
                <div className="flex justify-center">
                  <button className="text-white border-white p-4 mr-10" onClick={handleConfirm}>Activate</button>

                </div>
                
            </div>
            
          </div>
          
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  }
  
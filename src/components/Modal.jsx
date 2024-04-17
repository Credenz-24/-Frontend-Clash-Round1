import React, { useEffect, useState } from "react";
import Graph from "./Graph";

export default function Modal({ lifelineIns, type, onClose, onSkipQuestion, onGPT, onStreakLifeline, onAudiencePoll, audiencePollData ,in_use_audience,in_use_gpt , in_use_streak, available}) {
  const [activated, setActivated] = useState(false);
  const [ifAnyLifelineActivte,setIfAnyLifelineActivte] = useState(false); // state to check if any lifeline is active then disable modal
  useEffect(()=>{
    
    if(in_use_audience){
      onAudiencePoll();
      setActivated(true);
    }

    switch (type) {
      case "GPT":
        console.log("helllllo")
        if (available.streak){
          setIfAnyLifelineActivte(true);
          onGPT();
          onClose();
          return;
        }else{

          setActivated(false);
        }
          // onGPT();
        
        break;
        case "skip":
          console.log("helllllo")
          setActivated(false);
            // onGPT();
          
          break;
        case "streak":
            console.log("helllllo")
            if (available.streak){
              setIfAnyLifelineActivte(true);
              onStreakLifeline();
              onClose();
              return;
            }else{
              setActivated(false);

            }
              // onGPT();
            
            break;
      default:
        console.error("just checking");
    }

  },[])


  console.log("lifeline crnt type",type)

  const handleConfirm = () => {
    switch (type) {
      case "skip":
        onSkipQuestion();
        break;
      case "GPT":
        console.log("helllllo")
          onGPT();

        
        break;
      case "streak":
        onStreakLifeline();
        break;
      case "audiencePoll":
        onAudiencePoll();
        setActivated(true);
        return;
      default:
        console.error("Invalid lifeline type");
    }
    onClose();
  };



  return (

    <>
    
    {!ifAnyLifelineActivte && 
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-[10px] bg-[slate-100]">
        <div className="relative w-auto my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-[#153c69]">
            <div className="flex items-center justify-between pt-6 pl-6 pr-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-[#0b143e] hover:bg-slate-600 text-white font-bold py-2 px-4 rounded text-xl  border-[2.3px]"
                type="button"
                onClick={onClose}
              >
                X
              </button>
            </div>
            <div className="text-white relative p-6 flex-auto h-[49vh] w-[50vw] max-h-[59vh] border-2 border-white m-6 resize-none overflow-y-scroll bg-[#A1C5FF]" readOnly style={{ scrollbarColor: "gray black", WebkitScrollbar: { width: "10px", backgroundColor: "black", }, scrollbarWidth: "thin" }}>
              {lifelineIns}
              {type === "audiencePoll" && in_use_audience &&(
                <div className="flex justify-center mt-10">
                  <Graph data={audiencePollData} />
                </div>
              )}
            </div>
            {/* Render the Activate button only if it's not an audience poll or if the audience poll hasn't been activated yet */}
            {!activated && (
              <div className="flex justify-center">
                <button className="text-white border-white p-4 mr-10" onClick={handleConfirm}>
                  Activate</button>
              </div>
            )}
          </div>
        </div>
      </div>
      }
      <div className="opacity-25 fixed inset-0 z-40 "></div>
    </>
  );
}

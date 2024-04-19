import { useState } from "react";
import Instruct from "../pages/InstrcutionPage/props/Instruct";

export default function Streak_Modal({ onClose }) {
  const closeStreakModal = () => {
    setShowStreakModal(false);
    fetchLifelines();
  };

  const InstructionArray = [
    {
      num:1,
      desc:"A 28 minute round of MCQs for individuals as well as a team(max 2 people) contenders  based on coding concepts in C/C++, Java and python, divided into Juniors and Seniors category. Juniors including F.E's and S.E's, seniors including T.E's and B.E's  where you would also be provided with 3 boonful lifelines(description will be provided in the game itself) All Questions are Compulsory!"
  },
  {
      num:2,
      desc:"MARKING SCHEME - The primary marks allotted are +4 if answered correctly and -2 if the answer for a particular question is incorrect. If a question attempted is incorrect, then from the next question +2 marks are allotted for each correctly answered question, else -1 until you get a correct answer for upcoming questions.  Maximum Streak will be added to your score."
  },
  {
      num:3,
      desc:"Contenders are not allowed to use multiple smart devices while solving the test and it would be considered as malpractice if Caught. Teams or players are not allowed to use any IDE or software once the game has started."
  },
  {
      num:4,
      desc:"You are not allowed to switch tabs or close the browser during the game. If you do so, the test will be submitted automatically. Multiple Device Logins from same account are strictly prohibited."
  },
  

];

  return (  
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-[10px]">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="rounded-3xl relative flex flex-col w-full bg-[#0b143e] border-2 border-blue-500">
            <div className="flex items-center justify-between p-6 border-b border-blue-500 rounded-t">
              <h2 className="text-2xl text-blue-100">Instructions</h2>
              <button
                className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className="bg-[#0b143e] hover:bg-slate-600 text-white text-xl p-2 px-4 rounded">X</span>
              </button>
            </div>
            <div className="relative p-6 flex-auto overflow-y-scroll" style={{ maxHeight: "60vh" }}>
              <div className="flex flex-col space-y-4 overflow-y-auto">
                {InstructionArray.map((instruction, index) => (
                  <Instruct key={index} num={instruction.num} desc={instruction.desc} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

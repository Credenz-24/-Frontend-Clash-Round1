import { useState } from "react";
import Instruct from "../pages/InstrcutionPage/props/Instruct";

export default function Streak_Modal({ onClose }) {
  const InstructionArray = [
    {
      num: 1,
      desc: "A 28 minute round of MCQs for individuals as well as a team (max2 people) contenders based on coding concepts in C/C++, Java, and Python, divided into Juniors and Seniors category."
    },
    {
      num: 2,
      desc: "A 28 minute round of MCQs for individuals as well as a team (max2 people) contenders based on coding concepts in C/C++, Java, and Python, divided into Juniors and Seniors category."
    },
    {
      num: 3,
      desc: "A 28 minute round of MCQs for individuals as well as a team (max2 people) contenders based on coding concepts in C/C++, Java, and Python, divided into Juniors and Seniors category."
    }
  ];

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-[10px]">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="rounded-3xl relative flex flex-col w-full bg-[#0b143e] border-2 border-blue-500">
            <div className="flex items-center justify-between p-6 border-b border-blueGray-200 rounded-t">
              <button
                className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className="bg-[#0b143e] hover:bg-slate-600 text-white text-xl p-2 rounded">X</span>
              </button>
            </div>
            <div className="relative p-6 flex-auto" style={{ maxHeight: "60vh" }}>
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

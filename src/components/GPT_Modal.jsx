import React, { useEffect, useState } from "react";

export default function GPT_Modal({
  lifelineIns,
  type,
  onClose,
  onConfirm,
  inputValue,
  onChange,
  response,
  question,
}) {

  const [prompt, setPrompt] = useState('');
  useEffect(()=>{
    setPrompt(question);
  },[question])

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-[10px] ">
        <div className="relative w-auto my-6 mx-auto">
          <div className="rounded-3xl relative flex flex-col w-full bg-[#0b143e] border-2 border-blue-500">
            <div className="flex items-center justify-between pt-6 pl-6 pr-6">
              <button
                className="bg-[#0b143e] hover:bg-slate-600 text-white font-bold py-2 px-4 rounded text-xl  border-[2.3px]"
                type="button"
                onClick={onClose}
              >
                X
              </button>
            </div>
            <div
              className="text-white relative p-6 flex-auto h-[80vh] w-[60vw] max-h-[50vh] border-2 border-white m-6 resize-none overflow-y-scroll bg-[#0b143e]"
              style={{
                scrollbarColor: "gray black",
                WebkitScrollbar: {
                  width: "10px",
                  backgroundColor: "black",
                },
                scrollbarWidth: "thin",
              }}
            >
              <textarea
                className="text-white bg-[#0b143e] border-white border-2 p-2 mr-2 w-full h-[70%] resize-none"
                placeholder="Enter your input"
                defaultValue={prompt}
                // value={prompt}
                onChange={onChange}
                rows={5} 
              />
              <div className="mt-10">
                <p>Answer to your question:</p>{response}
                {console.log("question",question)}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="text-white border-white p-2 mr-2"
                onClick={onConfirm}
              >
                {/* Find Answer! */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

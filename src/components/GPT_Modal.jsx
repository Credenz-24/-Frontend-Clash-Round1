import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [promptResponse, setPromptResponse] = useState('');
  useEffect(()=>{
    setPrompt(question);
    if(response !== ''){
      setPromptResponse(response);
    }
  },[question])

  

  const handleGptMessage = (e)=>{
    const loadingToastId = toast.loading("Please Wait!");

      axios
        .post(
          "http://127.0.0.1:8000/core/gpt/",
          { message: prompt },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log("errstatus",response.data.status);
          console.log("GPT");
          // setFetchLifeline((prevState) => ({ ...prevState, gpt: false }));
          // setGptSelected(false);
          // console.log(response.data);
          setPromptResponse(response.data.bot_message);
          // setShowModal(false);
          toast.dismiss(loadingToastId);
          // setShowGPTModal(true);
          // setAudiencePollVisible(false);
          // setGptSelected(true);
        })
        .catch((error) => {
          console.log(error)
          if (error.response && error.response.status === 400) {
            setIsError(true);
            setGptSelected(true);
            setShowGPTModal(true);
          } else {
            setIsError(true);
            console.error("Error fetching question:", error);
          }
          toast.dismiss(loadingToastId);
        });
  
  }
  

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
                {/* {console.log("question",question)} */}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="text-white border-white p-2 mr-2"
                onClick={handleGptMessage}
              >
                Find Answer!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

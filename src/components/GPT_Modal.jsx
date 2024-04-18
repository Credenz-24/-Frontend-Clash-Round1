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
  // response,
  question,
  in_use
}) {
  const [prompt, setPrompt] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to track button disabled status
  const [isAnswerReceived, setIsAnswerReceived] = useState(false); // State to track if an answer is received

  useEffect(() => {
    setPrompt(question);
  } , [question]);

  useEffect(() => {
    console.log("usef", promptResponse)
    //handleGptMessage();
    if (promptResponse !== '') {
      setPromptResponse(promptResponse);
      setIsAnswerReceived(true); // Set to true if a response is received
      setIsButtonDisabled(true); // Disable the button when a response is received
    }
  }, [promptResponse]);

  const handleGptMessage = (e) => {
    const loadingToastId = toast.loading("Please Wait!");
    setIsButtonDisabled(true); // Disable the button when clicked
    e.preventDefault();
    axios
      .post(
        "https://api.clash.credenz.in/gpt/",
        { message: prompt },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("errstatus", response.data.status);
        console.log("GPT");
        setPromptResponse(response.data.bot_message);
        setIsAnswerReceived(true); // Set to true when a response is received
        toast.dismiss(loadingToastId);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          // setIsError(true);
          //setGptSelected(true);
          //setShowGPTModal(true);
        } else {
          // setIsError(true);
          console.error("Error fetching question:", error);
        }
        toast.dismiss(loadingToastId);
      })
      .finally(() => {
        setIsButtonDisabled(true); // Keep the button disabled
      });
  };

  return (
    <>
    {console.log("in_use flag", in_use)}
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
              className="text-white relative p-6 flex-auto h-[80vh] w-[60vw] max-h-[50vh] border-2 m-6 resize-none overflow-y-scroll bg-[#0b143e]"
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
                onChange={onChange}
                rows={5} 
              />
              <div className="mt-10">
                <p>Answer:</p>
                <p>{promptResponse}</p> 
                {console.log("prompt res",promptResponse)}
              </div>
            </div>
            <div className="flex justify-center">
              {console.log("answer received:", isAnswerReceived)}
              {in_use ? ( // Render the button only if lifeline is not in use
                <>
                  {isAnswerReceived && (
                    <div className="text-white mt-4">
                      <p>Answer:</p>
                      <p>{promptResponse}</p>
                      {console.log("prompt res in below div",promptResponse)}
                    </div>
                    
                  )}
                </>
              ) : (
                // Render the button only if an answer is not received
                !isAnswerReceived && (
                  <button
                    className="text-white border-white p-2 mb-4 bg-[#4375ff] rounded-md hover:bg-[#37529d] text-s"
                    onClick={handleGptMessage}
                    disabled={isButtonDisabled} // Disable the button if isButtonDisabled is true
                  >
                    {isButtonDisabled ? "Finding Answer..." : "Find Answer!"}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

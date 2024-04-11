import React from "react";

export default function Streak_Modal({
  onClose,
  data1,
  data2
}) {

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-900 outline-none focus:outline-none">
            <div className="flex items-center justify-between pt-6 pl-6 pr-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded text-xl border-[2.3px]"
                type="button"
                onClick={onClose}
              >
                X
              </button>
            </div>
            <div
              className="text-white relative p-6 flex-auto h-[49vh] w-[20vw] max-h-[50vh] border-2 border-white m-6 resize-none overflow-y-scroll bg-slate-800"
              style={{
                scrollbarColor: "gray black",
                WebkitScrollbar: {
                  width: "10px",
                  backgroundColor: "black",
                },
                scrollbarWidth: "thin",
              }}
            >
              <div>
                <p>Encode the data!</p>
              </div>
              <div>
                <p>{data1}</p>
                <p>{data2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import Instruct from "../pages/InstrcutionPage/props/Popup";
import LifeLine from "../pages/InstrcutionPage/props/Popup";
import Popup from "../pages/InstrcutionPage/props/Popup";
import InstructionMain from "../pages/InstrcutionPage/InstructionMain";
export default function Streak_Modal({
    onClose,
  }) {
  
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-[10px]">
          <div className="relative w-auto my-6 mx-auto">
            <div className="rounded-3xl relative flex flex-col w-full bg-[#0b143e] border-2 border-blue-500">
              <div className="flex items-center justify-between pt-6 pl-6 pr-6 border-blueGray-200 rounded-b">
                <button
                  className="bg-[#0b143e] hover:bg-slate-600 text-white font-bold py-2 px-4 rounded text-xl  border-[2.3px]"
                  type="button"
                  onClick={onClose}
                >
                  X
                </button>
              </div>
              <div
                className="text-white relative p-6 flex-auto h-[70vh] w-[80vw] border-2 m-6 resize-none overflow-y-scroll bg-[#0b143e]"
                style={{
                  scrollbarColor: "gray black",
                  WebkitScrollbar: {
                    width: "10px",
                    backgroundColor: "black",
                  },
                  scrollbarWidth: "thin",
                }}
              >
                <InstructionMain/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
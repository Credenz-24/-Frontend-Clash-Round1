import React from "react";

export default function Questions() {
  return (
    <div className="mt-20">
      <div className="h-[40vh] w-[50vw] bg-gradient-to-r from-indigo-600 to-cyan-600 flex border border-black rounded-xl p-4 bg-opacity-10">
        <div className="text-xl font-bold overflow-y-auto text-slate-100">
          <span className="font-bold text-xl ">Q1 :-</span>
          <br />
          What is the purpose of the '__str__' method in Python?
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-10 w-[50vw] ">
        <button
          type="button"
          class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-whiteborder-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 border-blue-600 text-white "
        >
          <span class="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
            A
          </span>
          <span class="ml-2">It converts a string to uppercase.</span>
        </button>
        <button
          type="button"
          class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-whiteborder-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 border-blue-600 text-white"
        >
          <div className="w-[10%]">
          <span class="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
            B
          </span>
          </div>

          
          <span class="ml-2">It returns a string representation of an object.</span>
        </button>
        <button
          type="button"
          class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-whiteborder-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 border-blue-600 text-white "
        >
          <div className="w-[10%]">
          <span class="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
            C
          </span>
          </div>
          <span class="ml-2">It checks if an object is of a specific data type. </span>
        </button>
        <button
          type="button"
          class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-whiteborder-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded border-2 border-blue-600 text-white"
        >
          <div className="w-[10%]">
          <span class="inline-flex items-center justify-center w-8 h-8 text-xs font-semibold border-blue-400 border-2 text-center rounded-lg mr-2">
            D
          </span>
          </div>
          <span class=" flex-grow"> It removes whitespace from the beginning and end of a string.</span>
        </button>
      
      </div>
      <div className="align-middle justify-center relative flex mt-10"> 
        <button
          type="button"
          class="py-2.5 px-5 me-2 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

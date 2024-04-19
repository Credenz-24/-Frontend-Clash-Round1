import React from 'react'
//import MarkingScheme from '../components/MarkingScheme';
import Questions from '../components/Mcq';

const QuestionMcq = () => {
  return (
    <div className="flex mx-auto h-auto overflow-y-scroll">
      <div className='flex md:flex-row flex-col justify-evenly w-[100%]'>
        <Questions />
      </div>
    </div>
  )
}

export default QuestionMcq

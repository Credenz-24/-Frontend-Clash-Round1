import React from 'react'
import MarkingScheme from '../components/MarkingScheme';
import Questions from '../components/Mcq';

const QuestionMcq = () => {
  return (
    <div className="flex ml-[7%]">
      <div className='flex'>
        <Questions />
      </div>
      <div className='flex w-[30%] ml-[10%] mt-[2%]'>
        <MarkingScheme />
      </div>

    </div>
  )
}

export default QuestionMcq

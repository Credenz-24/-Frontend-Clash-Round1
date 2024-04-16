
import TopCards from "../props/TopCards";
const Senior = ({leadSenior}) => {
    return ( 
        <>
            <div className="Team h-full w-full flex flex-col justify-center items-center ">
                <div className="top-3-juniors h-[30%] w-full bg-purple-40 flex justify-center items-center gap-[6vw] ">
                {
                    leadSenior.filter((items, index) => (index < 3))
                        .map((item) => (
                            <TopCards key={item.username} name={item.username} teamScore={item.team_score}  />
                        ))
                }
                </div>
                {/* <div className="current-rank h-[10%] w-full bg-green-0 flex justify-center items-center">
                    <div className="box h-full w-[700px] bg-[#09112c] border-blue-500 border-2 border-solid rounded-[5px] flex justify-between items-center px-[4vw] ">
                        <h1 className='text-white text-[30px]'>Your rank</h1>
                        <h1 className='text-white text-[30px]'>{per.team_rank}</h1>
                    </div>
                </div> */}
                <div className="juniors-table h-[60%] w-full flex justify-center items-center bg-green-40 ">
                    <div className=" junior h-[300px] w-[700px] mx-auto bg-red-80 shadow-md rounded-lg overflow-y-scroll no-scrollbar border-[2px] border-solid border-blue-500">
                    <h2 className="text-2xl sticky top-0 font-bold text-center text-white bg-[#09112c] p-4 border-b-[2px] border-solid border-blue-500">Junior Leaderboard</h2>
                    <ul className="divide-y divide-blue-900">
                        {leadSenior.map((entry, index) => (
                            <li key={index} className="flex justify-between items-center h-[78px] w-[100%] p-4 hover:bg-[#0b143e] hover:text-zinc-800">
                                <span className="font-semibold text-blue-400">{index + 1}</span>
                                <span className="text-white font-medium">{entry.username}</span>
                                {/* Adjust according to your data structure */}
                                <span className="text-gray-200">{entry.team_score} pts</span>
                                <span className="text-sm text-gray-300">Q{entry.correct_questions}</span>
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Senior;
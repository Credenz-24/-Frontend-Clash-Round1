const TopCards = ({name, rank, teamScore}) => {
    return ( 
        <>
            <div className="card h-[200px] w-[350px] bg-blue-00 bg-[#0b143e] border-[2px] border-solid border-blue-500 rounded-[20px] flex flex-col justify-center items-center backdrop-blur-[30px] ">
                <div className="user h-[50%] w-full bg-yellow-30 flex justify-center items-center ">
                    <div className="trophy-image w-[30%] h-full bg-red- flex justify-center items-center">
                        <img src="../fire.png" alt="" className="h-[40px] w-[40px]" />
                        {/* <h1 className="text-[25px] text-white"></h1> */}
                    </div>
                    <div className="username w-[70%] h-full bg-red-70 flex justify-start items-center px-[20px]">
                        <h1 className="text-[25px] text-white">{name}</h1>
                    </div>

                </div>
                <div className="stats  h-[50%] w-full bg-blue-30 flex justify-center items-centers ">
                    <div className="questions-solved h-full w-[60%] bg-green-90 flex flex-col justify-center items-center ">
                        <h5 className="text-[20px] text-white">Team Score</h5>
                        <h1 className="text-[30px] text-white">{teamScore}</h1>
                    </div>
                    <div className="accuracy h-full w-[40%] bg-cyan- flex flex-col justify-center items-center">
                        <h5 className="text-[20px] text-white">Accuracy</h5>
                        <h1 className="text-[30px] text-white">98%</h1>
                    </div>
                </div>
            
            </div>
        </>
     );
}
 
export default TopCards;
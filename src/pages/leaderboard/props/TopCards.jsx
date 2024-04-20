const TopCards = ({name, rank, teamScore}) => {
    return ( 
        <>
        <style>
            {`
                @media only screen and (max-width: 468px) {
                    .card{
                        width:100%;
                        height:100px;
                        display:flex;
                        flex-direction:column;
                        justify:center;
                        items:center;
                        padding: 0 2vw;
                        

                    }
                    .card .stat{
                        // display:none;
                    }
                }
                @media only screen and (max-width: 760px) {
                    
                    .card{
                        height:100px;
                        width:200px;
                    }

                    .stat{
                        display:none;
                    }
                    .user{
                        height:100%;
                    }
                        
                }
            `}
        </style>
            <div className="card h-[fit-content] py-2 md:w-[350px] !w-[inherit] bg-blue-00 bg-[#0b143e] border-[2px] border-solid border-blue-500 rounded-[20px] flex flex-col justify-center items-center backdrop-blur-[30px] ">
                <div className="user h-[50%] w-full bg-yellow-30 flex justify-center items-center ">
                    <div className="trophy-image w-[30%] h-full bg-red- flex justify-center items-center">
                        <img src="../diver.png" alt="" className="h-[50px] w-[50px]" />
                        {/* <h1 className="text-[25px] text-white"></h1> */}
                    </div>
                    <div className="username w-[70%] h-full bg-red-70 flex justify-start items-center px-[20px]">
                        <h1 className="text-[15px] text-white">{name}</h1>
                    </div>

                </div>
                <div className="stats h-[50%] w-full bg-blue-30 flex justify-center items-center ">
                    <div className="questions-solved h-full w-[60%] bg-green-90 flex flex-col justify-center items-center align-middle text-center">
                        <h5 className="text-[15px] text-white text-center">Team Score</h5>
                        <h1 className="text-[20px] text-white text-center">{teamScore}</h1>
                    </div>
                </div>
            
            </div>
        </>
     );
}
 
export default TopCards;

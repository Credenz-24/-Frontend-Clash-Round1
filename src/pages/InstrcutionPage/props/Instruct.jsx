const Instruct = (props) => {
    const number = props.num;
    const description = props.desc;

    return ( 
        <>
        <style>
        {`
        @media only screen and (max-width: 468px) {
            .instruct1{
                width:100%;
                height: auto;
                overflow-x:hidden;
                display:flex;
                justify-content:center;
                align-items:center;
                border:1px solid #3b82f6;
                border-radius:10px;

            }
            .nums{
                width:20%;
                height:100%;
            }
            .number{
                border-radius:0px;
                width:100%;
                height:100%;
            }
            .description{
                border-radius:0px;
                width:80vw;
                height:auto;
                background-color:transparent;
                color:white;
                padding: 5px 10px;
                overflow-y: auto;
                display:flex;
                justify-content:end;
                align-items:center;
                padding-top:10px;
                flex-wrap:wrap;
            }
            .desc{
                font-size:11px;
            }
        }
        `}
        </style>
            <div className="instruct1 h-auto w-full bg-yellow-20 flex justify-center items-center  ">
                <div className="nums w-[10%] h-full bg-red-90 flex justify-center items-center">
                    <div className="number w-[80px] h-[80px] bg-blue-500 rounded-full flex justify-center items-center" >
                        <h1 className="text-[25px] text-white">{number}</h1>
                    </div>
                </div>
                <div className="description w-[80%] h-[100%] bg-blue-300 rounded-full no-scrollbar overflow-hidden overflow-y-scroll flex justify-center items-center px-[3vw] py-[15px]">
                    <p className=" desc flex justify-center items-center text-[15px] font-regular">{description}</p>
                </div>
            </div>
        </>
     );
}
 
export default Instruct;
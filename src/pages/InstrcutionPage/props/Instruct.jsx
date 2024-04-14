

const Instruct = (props) => {
    const number = props.num;
    const description = props.desc;

    return ( 
        <>
            <div className="instruct1 h-[100px] w-full bg-yellow-20 flex justify-center items-center  ">
                <div className="nums w-[10%] h-full bg-blue-10 flex justify-center items-center">
                    <div className="number w-[80px] h-[80px] bg-blue-500 rounded-full flex justify-center items-center" >
                        <h1 className="text-[25px] text-white">{number}</h1>
                    </div>
                </div>
                <div className="description w-[80%] h-[90%] bg-blue-300 rounded-full flex justify-center items-center px-[3vw]">
                    <p>{description}</p>
                </div>
            </div>
        </>
     );
}
 
export default Instruct;
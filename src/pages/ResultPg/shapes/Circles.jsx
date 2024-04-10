
const Circles = (props) => {

    let num = props.num;
    let sodf= 400-(4*num);
    

    const circleStyles = {
        "fill": "none",
        "stroke": "#042AA7",
        "strokeWidth": "20px",
        "strokeDasharray": "400",
        "strokeDashoffset": sodf,
        "animation": "anim 1s linear forwards"
    }

    return ( 
        
        <>
            <div className="skills h-[22vh] w-[22vh] relative  flex justify-center items-center ">
                <div className='outercircle1 h-[22vh] w-[22vh] rounded-full border-2 border-[white] border-solid  flex justify-center items-center p-[20px] '>
                    <div className='innercircle h-[16vh] w-[16vh] bg-slate-950 rounded-full border-2 border-[white] border-solid flex justify-center items-center'>
                        <div className = "number font-[600] text-white ">
                            {num}%    
                        </div>  
                    </div> 
                    
                    
                </div>
                <svg className=" top-[0%] left-[0%] absolute" xmlns ="http://www.w3.org/2000/svg"version="1.1" width="22vh" height ="22vh">

                    <circle style={circleStyles} className="" cx="80" cy="80" r="65" stroke-linecap="round"/>

                    </svg>
            </div>
            
                
            
        </>
     );
}
 
export default Circles;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Instruct from "./props/Instruct";
import LifeLine from "./props/LifeLine";
import Popup from "./props/Popup";
// import { useNavigate } from "react-router-dom";



const InstructionMain = (props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [acceptedConditions, setAcceptedConditions] = useState(false);
    const navigate = useNavigate();

    const [pop,setPop]=useState(false);

    const LifelineArray=[
        {
            id:1,
            title:"STREAK",
            img:"../fire.png",
            content:"Something of lifeline 1"
        },
        {
            id:2,
            title:"GPT",
            img:"../technology.png",
            content:"Something of lifeline 2"
        },
        {
            id:3,
            title:"POLL",
            img:"../polling.png",
            content:"Something of lifeline 3"
        },
        {
            id:4,
            title:"SKIP",
            img:"../right-arrow.png",
            content:"Something of lifeline 3"
        },
    ];

    const handleProceedClick = () => {
        if (acceptedConditions) {
          console.log("Proceeding...");
          navigate("/question")
        } else {
          console.log("Please accept the conditions.");
        }
      };

    const[text,setText]=useState([]);
    const [status,setStatus]=useState([]);
    const id = 101;

    // const text = props.text; 
    
    


    const handlePopup = () => {
        setPop(prevPop => !prevPop); // Toggle the previous value of pop
    }
    

    const handleNext = () => {
        setCurrentStep(currentStep+1);
    }
    const handlePrev = () => {
        setCurrentStep(currentStep-1);
    }

    const InstructionArray=[
        {
            num:1,
            desc:"A 28 minute round of MCQs for individuals as well as a team (max2 people) contenders based on coding concepts in C/C++, Java, andPython, divided into Juniors and Seniors category."
        },
        {
            num:2,
            desc:"A 28 minute round of MCQs for individuals as well as a team (max2 people) contenders based on coding concepts in C/C++, Java, andPython, divided into Juniors and Seniors category."
        },
        {
            num:3,
            desc:"A 28 minute round of MCQs for individuals as well as a team (max2 people) contenders based on coding concepts in C/C++, Java, andPython, divided into Juniors and Seniors category."
        }
    ];

    


    let display = (text) => { 
        const newDisplay = LifelineArray.filter(items => items.id === text);
        console.log("NEW DISPLAY: ",newDisplay);
        setText(newDisplay);
      }

    return ( 
        <>
            <div className="container h-[86.3vh] w-full bg-red-60 z-[999] flex justify-center items-center ">
                <div className="content-container w-[90%] bg-blue-90 h-[100%] flexf flex-col justify-center items-center ">
                    
                    {/* INSTRUCTIONS */}
                    {currentStep===0 ? (
                        <>
                            <div className="title h-[16%] w-full bg-green-90 flex justify-center items-center ">
                                <h1 className="text-[40px] text-white">INSTRUCTIONS</h1>
                            </div>
                            <div className="instructions h-[70%] w-full bg-violet-80 px-[5vw] flex flex-col justify-center items-center gap-[2vw]">
                            {InstructionArray.map((item) => {
                                return(
                                    <>
                                        <Instruct num={item.num} desc={item.desc}/>
                                    </>
                                );
                            })}
                            </div>
                            <div className="buttons h-[8%] w-full bg-orange- flex justify-center items-center gap-[50px]">
                                <button className="btnPrev text-white px-[20px] py-[10px] bg-blue-500 rounded-full hover:bg-blue-800 " onClick={handleNext}>
                                    Next
                                </button>
                            </div>
                            
                        </>
                    ):(null)}

                    {/* LIFELINES */}
                    {currentStep==1 ? (
                        <div className="h-[100%] w-full relative ">
                            <div className="title h-[12%] w-full bg-green-90 flex justify-center items-center ">
                                <h1 className="text-[40px] text-white">LIFELINES</h1>
                            </div>
                            <div className="lifeLines relative bg-orange-30 h-[65%] w-full bg-green- px-[5vw] flex justify-center items-center gap-[4vw]">
                                
                                {LifelineArray.map((items) => {
                                    return(
                                        <>
                                            <LifeLine key={id} dis={display} popup={handlePopup} id={items.id} title={items.title} img={items.img}/>
                                        </>
                                    );
                                    
                                })}
                                    
                                
                            </div>
                            <div className="confirmRadio h-[3%] w-full bg-green-30 flex justify-center items-center gap-[10px]">
                                <input type="radio" name="confirm" id="confirm" onClick={() => setAcceptedConditions(true)} />
                                <label htmlFor="confirm" className="text-white">I have read the instructions</label>
                            </div>
                            <div className="buttons h-[20%] w-full bg-orange-60 flex justify-center items-center gap-[50px]">
                                <button className="btnPrev text-white px-[20px] py-[10px] bg-blue-500 rounded-full hover:bg-blue-800 " onClick={handlePrev}>
                                    Previous
                                </button>
                                {acceptedConditions===true ? (<button className="btnPrev text-white px-[20px] py-[10px] bg-blue-500 rounded-full hover:bg-blue-800 " onClick={handleProceedClick}>
                                    Proceed
                                </button>):null}
                            </div>


        
                            {pop===true ? (
                                <div className="cont absolute top-[0%] h-[100%] w-full bg-transparent flex justify-center items-center backdrop-blur-[10px]">
                                    <Popup cls={handlePopup} pop={text.filter((text) => text.id)} key={id} />
                                </div>
                            ):(null)}


                            
                        </div>
                    ):(null)}
                </div>

            </div>
        </>
     );
}
 
export default InstructionMain;
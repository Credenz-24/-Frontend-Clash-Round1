import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Instruct from "./props/Instruct";
import LifeLine from "./props/LifeLine";
import Popup from "./props/Popup";
import { toast } from "react-toastify";
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
            content:"The Streak Lifeline awards players who achieve a consecutive streak of four correct answers by revealing a Caesar Cipher codeword for the subsequent question. Answer is obtained in encoded form"
        },
        // {
        //     id:2,
        //     title:"AI HELPER",
        //     img:"../technology.png",
        //     content:"The AI Helper lifeline empowers players to utilize artificial intelligence to procure answers. By activating this lifeline, players gain access to an AI-driven tool for obtaining response"
        // },
        {
            id:2,
            title:"POLL",
            img:"../polling.png",
            content:"The Audience Poll lifeline allows players to seek assistance from the collective wisdom of the audience. Upon activation, players receive a graphical representation of most probable option"
        },
        {
            id:3,
            title:"SKIP",
            img:"../right-arrow.png",
            content:"The Skip Lifeline grants the player the option to bypass the current question without providing an answer.Upon activation, the current question will be substituted with a new one"
        },
    ];


    const handleProceedClick = () => {
        if (acceptedConditions) {
            const loadingToastId =  toast.loading("Proceeding...");
          navigate("/question")
          toast.dismiss(loadingToastId);
        } else {
          toast.warning("Please accept the conditions.");
        }
      };

    const[text,setText]=useState([]);
    const [status,setStatus]=useState([]);
    const id = 101;


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
            desc:"A 28 minute round of MCQs for individuals as well as a team(max 2 people) contenders  based on coding concepts in C/C++, Java and python, divided into Juniors and Seniors category. Juniors including F.E's and S.E's, seniors including T.E's and B.E's  where you would also be provided with 3 boonful lifelines(description will be provided in the game itself)"
        },
        {
            num:2,
            desc:"MARKING SCHEME - The primary marks allotted are +4 if answered correctly and -2 if the answer for a particular question is incorrect. If a question attempted is incorrect, then from the next question +2 marks are allotted for each correctly answered question, else -1 until you get a correct answer for upcoming questions.  Maximum Streak will be added to your score."
        },
        {
            num:3,
            desc:"Contenders are not allowed to use multiple smart devices while solving the test and it would be considered as malpractice if Caught. Teams or players are not allowed to use any IDE or software once the game has started."
        },
        {
            num:4,
            desc:"You are not allowed to switch tabs or close the browser during the game. If you do so, you will be logged out automatically. Multiple Device Logins from same account are strictly prohibited."
        },
        

    ];

    


    let display = (text) => { 
        const newDisplay = LifelineArray.filter(items => items.id === text);
        console.log("NEW DISPLAY: ",newDisplay);
        setText(newDisplay);
      }

    return ( 
        <>
        <style>
            {`
                 @media only screen and (max-width: 468px) {
                    .container{
                        width:100%;
                        height:680px;
                        overflow-x:hidden;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        // padding: 2vw 2vw;
                        gap:20px;
                    }

                    .content-container{
                        width:100%;
                        height:100%;
                        gap:40px;
                        overflow-y:scroll;

                    }
                    .title{
                        height:10%;
                        width:100%;
                    }
                    .instructions{
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        gap:15px;
                    }
                    .instru{
                        height:100%;
                        width:100%;
                        // background-color:red;
                        padding:0px 10px;
                        overflow-y:scroll;
                    }
                    .life{
                        height:100%;
                        width:100%;
                        background-color:;

                    }
                    .lifeLines{
                        height:70%;
                        width:100%;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;

                    }

                    .buttons{
                        height:15%;
                        width:100%;
                    }
                    
                    
                } 
            `}
        </style>
            <div className="container h-[86.3vh] w-full bg-red-60 z-[999] flex justify-center items-center ">
                <div className="content-container w-[90%] bg-blue-90 h-[100%] flex flex-col justify-center items-center ">
                    
                    {/* INSTRUCTIONS */}
                    {currentStep===0 ? (
                        <>
                            {/* <div className="title h-[16%] w-full bg-green-90 flex justify-center items-center ">
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
                            </div> */}
                            <div className="instru max-h-[100%] w-full bg-red- overflow-y-auto no-scrollbar flex justify-center items-center gap-[3vh] flex-wrap">
                                <div className="title h-[16%] bg-gradient-to-b from-[#002251] to-[#001E45] w-full flex justify-center items-center sticky top-0">
                                    <h1 className=" texting text-[40px]  text-white opacity-[100%]">INSTRUCTIONS</h1>
                                </div>
                                    <div className="instructions bg-green-80 h-[100%] w-full  px-[5vw] flex flex-col justify-center items-center gap-[2vw]">
                                        {InstructionArray.map((item) => {
                                            return (
                                                <Instruct key={item.num} num={item.num} desc={item.desc} />
                                            );
                                        })}
                                    </div>
                                </div>
                            <div className="buttons h-[8%] w-full bg-orange-60 flex justify-center items-center gap-[50px]">
                                <button className="btnPrev text-white px-[20px] py-[10px] bg-blue-500 rounded-full hover:bg-blue-800 " onClick={handleNext}>
                                    Next
                                </button>
                            </div>
                            
                        </>
                    ):(null)}

                    {/* LIFELINES */}
                    {currentStep==1 ? (
                        <div className="life bg-red- h-[100%] w-full relative ">
                            <div className="title h-[12%] w-full bg-green-90 flex justify-center items-center ">
                                <h1 className="text-[40px] text-white">LIFELINES</h1>
                            </div>
                            <div className="lifeLines bg-orange-30 h-[65%] w-full px-[5vw] flex justify-center items-center gap-[4vw]">
                                
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
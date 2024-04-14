import { useState } from "react";
import Popup from "./Popup";
import InstructionMain from "../InstructionMain";


const LifeLine = (props) => {
    const title = props.title;
    const image = props.img;
    const handlepops = props.popup;
    const ID = props.id;
    const display = props.dis;

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

    const[text,setText]=useState([]);

    let Display = (text) => { 
        const newDisplay = LifelineArray.filter(items => items.id === text);
        console.log(newDisplay);
        setText(newDisplay);
      }

    

    
    return ( 
        <>
            
            <div className="cards h-[300px] w-[250px] bg-[#0b143e] rounded-[10px] backdrop-blur-[50px] border-[2px] border-solid border-blue-500 ">

                <div className="image h-[60%] w-full bg-[#09112c] bg-purple-40 flex justify-center items-center rounded-[10px]">
                    <img src={image} alt=""  className=" h-[120px] w-[120px]"/>
                </div>

                <div className="title text-white text-[30px] font-bold h-[18%] w-full bg-yellow-30 flex justify-center items-center">{title}</div>

                <div className="btn h-[22%] w-full flex justify-center items-center">
                    <button className="button text-white  px-[20px] py-[10px] bg-blue-500 rounded-full hover:bg-blue-800"
                    onClick={() => {
                        handlepops();
                        Display(ID);
                        display(ID);
                    }}
                    >Know more</button>
                </div>
       
                
                {/* <div className="hidden">
                    <Popup  idx={text}/>
                </div> */}

                

                
            </div>
            
        </>
     );
}
 
export default LifeLine;
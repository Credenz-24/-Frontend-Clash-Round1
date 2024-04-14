import LifeLine from "./LifeLine";
import InstructionMain from "../InstructionMain";
import { useState } from "react";

const Popup = (props) => {
    const close = props.cls;
    const title = props.title;
    const image = props.img;
    const desc = props.desc;
    const handlepops = props.popup;
    const Text = props.pop;
    const ID = props.idx;

    console.log(Text);

    

    return ( 
        <>
            {Text.map((text) => (
                <div className="popup absolute top-[10%] h-[400px] w-[350px] bg-[#0b143e] rounded-[10px] flex flex-col justify-center items-center backdrop-blur-[10px]">
                    <div className="image h-[50%] w-full bg-[#3a6eff] rounded-[10px] flex justify-center items-center">
                        <img src={text.img} alt="" className="h-[150px] w-[150px]" />
                    </div>
                    <div className="title h-[10%] w-full bg-transparent flex justify-center items-start">
                        <h1 className="text-white text-[30px]">{text.title}</h1>
                    </div>
                    <div className="desc h-[20%] w-full bg-blue-40 flex justify-center items-center">
                        <h4 className="text-white">{text.content}</h4>
                    </div>
                    <div className="closeBtn h-[20%] w-full flex justify-center items-center">
                        <button className="closeBtn text-white  px-[20px] py-[10px] bg-blue-500 rounded-full hover:bg-blue-800" onClick={close}>Close</button>
                    </div>
                </div>
            ))}
        </>
     );
}
 
export default Popup;
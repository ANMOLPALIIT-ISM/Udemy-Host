import React from "react";
import Abutton from "./Abutton";
const Codeblock=({position,heading,subheading,linkel1,btntext1,linkel2,btntext2,imglink})=>{
    return (
        <div className={`flex flex-row my-20 justify-between  items-center gap-10`}>
            <div className="w-[400px] flex flex-col gap-8 text-4xl font-bold">
                {heading}
                <div className="text-black font-thin text-2xl">
                    {subheading}
                </div>
                <div className="flex gap-7 mt-7">
                    <Abutton linkto={linkel1}>{btntext1}</Abutton>
                    <Abutton linkto={linkel2}>{btntext2}</Abutton>
                </div>
            
            
            </div>
            <div>
                <img src={imglink} alt="image"></img>
            </div>
        </div>
        
    );
}
export default Codeblock;
import React ,{useEffect,useRef,useState} from "react";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi2";
function CourseSubSectionAccordion({subSec}){
    return (
        <div>
            <div className="flex justify-between py-2">
                <div className="flex items-center gap-2">
                    <span>
                        <HiOutlineVideoCamera></HiOutlineVideoCamera>

                    </span>
                    <p>
                        {subSec?.title}
                    </p>
                </div>  
            </div>
        </div>    
    )
}
export default CourseSubSectionAccordion;
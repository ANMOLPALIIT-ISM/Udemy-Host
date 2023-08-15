import React from "react";
import { useSelector } from "react-redux";
import {FaCheck} from "react-icons/fa"
import CourseBuilderForm from "./CourseBuilderForm";
import CourseInformation from "./CourseInformation"
import PublishCourse from "../publishCourse/index"
const RenderSteps=()=>{
    const {step}=useSelector((state)=>state.course);    
    const steps=[
        {
            id:1,
            title:"Course Information"
        },{
            id:2,
            title:"Course Builder"
        },{
            id:3,
            title:"Publish"
        }
    ]
    return (
        <>
        <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <>
            <div
              className="flex flex-col items-center "
              key={item.id}
            >
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow bg-black text-white"
                    : "border-black text-black"
                } ${step > item.id && "bg-black text-white"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-white" />
                ) : (
                  item.id
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-white" : "border-black"
                } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-black" : "text-black"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </>
        ))}
      </div>
        <div>
            {step===1 && <CourseInformation></CourseInformation>}
            {step===2 && <CourseBuilderForm></CourseBuilderForm>}
            {step==3 && <PublishCourse></PublishCourse>}
        </div>
        </>
    );



} 
export default RenderSteps;
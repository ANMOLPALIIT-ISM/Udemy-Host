import React from "react"
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { editCourseDetails } from "../../../services/operations/courseDetailsAPI";
import { resetCourseState, setStep } from "../../../slices/courseSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PublishCourse=()=>{
    const {register,handleSubmit,setValue,getValues}=useForm();
    const {course}=useSelector((state)=>state.course);
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    useEffect(()=>{
        if(course?.status==="Published"){
            setValue("public",true);
        }
    },[])
    const goToCourses=()=>{
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses")
    }
    const handleCoursePublish=async()=>{
        if(course?.status=="Published" && getValues("public")===true || course?.status=="Draft" && getValues("public")===false){
            // return;
            goToCourses();
            return;
        }   
        const formData=new FormData();
        formData.append("courseId",course._id);
        const courseStatus=getValues("public")?"Published":"Draft";
        formData.append("status",courseStatus);
        const result=await editCourseDetails(formData,token);
        if(result){
            goToCourses();
        }

    }
    const onSubmit=()=>{
        handleCoursePublish();
    }
    const goBack=()=>{
        dispatch(setStep(2));
    }
    return (
    
        <div className="rounded-md border-[1px] border-black bg-black p-6">
            <p className="text-2xl font-semibold text-white">Publish Course</p>   
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-6 mb-8">
                    <label className="inline-flex items-center text-lg">
                    <input type={"checkbox"} {...register("public")} className="border-gray-300 h-4 w-4 rounded bg-white text-black focus:ring-2 focus:ring-black"></input>
                      <span className="ml-2 text-white">Make this course Public</span>
                       </label> 
                </div>
                <div className="ml-auto flex max-w-max items-center gap-x-4">
                    <button type="button" onClick={goBack} className="flex cursor-pointer items-center gap-x-2 rounded-md bg-white py-[8px] px-[20px] font-semibold text-black">
                        Back
                    </button>
                    <button className="flex cursor-pointer items-center gap-x-2 rounded-md bg-white py-[8px] px-[20px] font-semibold text-black">
                        Save Changes
                    </button>
                </div>
            </form>

       </div>     
    );
}
export default PublishCourse;
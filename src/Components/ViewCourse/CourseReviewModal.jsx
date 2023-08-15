import React from "react";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import {useForm} from "react-hook-form";
import ReactStars from "react-rating-stars-component"
import { apiConnector } from "../../services/apiconnector";
import { createRating } from "../../services/operations/courseDetailsAPI";
const CourseReviewModal=({setReviewModal})=>{
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const {courseEntireData}=useSelector((state)=>state.viewCourse);
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors}
    }=useForm();
    useEffect(()=>{
        setValue("courseExperience","");
        setValue("courseRating",0);
    },[]);
    const onSubmit=async(data)=>{
        
        await createRating({
            courseId:courseEntireData._id,
            rating:data.courseRating,
            review:data.courseExperience,
        },token);
        setReviewModal(false);
    }
    const ratingChanged=(newRating)=>{
        setValue("courseRating",newRating);
    }
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-black bg-black">
               <div className="flex items-center justify-between rounded-t-lg bg-black p-5">    
                <p className="text-xl font-semibold text-white">Add Review</p>
                <button onClick={()=>setReviewModal(false)}>
                    Close
                </button>
               </div>

            
            <div className="p-6">
                <div className="flex items-center justify-center gap-x-4">
                    <img src={user?.image} className='aspect-square w-[50px] rounded-full object-cover'/>
                    <div>
                        <p className="font-semibold text-white">{user?.firstName}{user?.lastName}</p>
                        <p className="text-sm text-white">Posting Publicly</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col items-center'>
                    <ReactStars count={5} onChange={ratingChanged} size={24} activeColor="#ffd700" ></ReactStars>
                     <div className="flex w-11/12 flex-col space-y-2">
                        <label className="text-sm text-white">Add Your Experience</label>
                        <textarea id="courseExperience" placeholder="Add Your Experience Here"
                        {...register("courseExperience",{required:true})}
                        className='form-style resize-x-none min-h-[130px] w-full'
                        >
                        </textarea>
                        {
                            errors.courseExperience && (
                                <span className="ml-2 text-xs tracking-wide text-white">
                                    Please Add Your experience
                                </span>
                            )
                        }
                     </div>
                     <div className="mt-6 flex w-11/12 justify-end gap-x-2">
                        <button onClick={()=>setReviewModal(false)} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-white py-[8px] px-[20px] font-semibold text-black`}>
                            Cancel
                        </button>
                        <button className="flex cursor-pointer items-center gap-x-2 rounded-md bg-white py-[8px] px-[20px] font-semibold text-black" >
                            Save
                        </button>
                    </div>       
                </form>
            </div>
            </div>
        </div>
    );
}
export default CourseReviewModal;
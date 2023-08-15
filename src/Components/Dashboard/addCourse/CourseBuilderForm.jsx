import React from "react";
import { useDispatch } from "react-redux";
import { createSection, updateSection } from "../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse, setStep } from "../../../slices/courseSlice";
import {useForm} from "react-hook-form"
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import NestedView from "./NestedView";

const CourseBuilderForm=()=>{
    const {register,handleSubmit,setValue,formState:{errors}}=useForm();
    const [editSectionName,setEditSectionName]=useState(null);
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const cancelEdit=()=>{
        setEditSectionName(null);
        setValue("sectionName","");
    }
    const goBack=()=>{
        dispatch(setStep(1));
        dispatch(setEditCourse(true))
    }
    const goToNext=()=>{
        if(course.courseContent.length===0){
            toast.error("Please Add atleast One Section")
            return;
        }
        if(course.courseContent.some((section)=>section.subSection.length===0)){
            toast.error("Please Add atleast one lecture in each section");
            return;
        }
        dispatch(setStep(3));

    }
    const onSubmit=async(data)=>{
        let result;
        if(editSectionName){
            result = await updateSection({sectionName:data.sectionName,sectionId:editSectionName,courseId:course._id},token)
        }
        else{
            result=await createSection({sectionName:data.sectionName,courseId:course._id},token)
        }
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName","")
        }
        
    }
    const handleChangeEditSectionName=(sectionId,sectionName)=>{
        if(editSectionName){
            cancelEdit();
        }
        setEditSectionName(sectionId);
        setValue("sectionName",sectionName);
    }

    return (
        <div className="space-y-8 rounded-md border-[1px] border-black p-6">
            <p className="text-2xl font-semibold text-black">Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-black">Section name</label>
                    <input
                        id='sectionName'
                        placeholder="Add Section Name"
                        {...register("sectionName",{required:true})}
                        className='form-style w-full'
                    />
                    {errors.sectionName && (<span className="ml-2 text-xs tracking-wide text-black">
                        Section Name is required
                    </span>)}
                </div>
                <div className="flex items-end gap-x-4">
                   <button type="submit">{editSectionName?"Edit Section Name":"Create Section"} </button>
                   {editSectionName && (<button type='button' onClick={cancelEdit} className='text-sm'>
                    Cancel Edit
                   </button>)}     
                </div>
            </form>
            {
                course.courseContent.length >0 && (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName}></NestedView>
                )
            }
            <div className="flex justify-end gap-x-3">
                <button onClick={goBack} className='flex cursor-pointer items-center gap-x-2 rounded-md bg-black py-[8px] px-[20px] font-semibold text-white'> 
                    Back
                </button>
                <button onClick={goToNext} className='flex cursor-pointer items-center gap-x-2 rounded-md bg-black py-[8px] px-[20px] font-semibold text-white'>
                    Next
                </button>
            </div>
        </div>
    );

}
export default CourseBuilderForm;
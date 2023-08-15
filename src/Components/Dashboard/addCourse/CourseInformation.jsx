import React from "react"
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../services/operations/courseDetailsAPI";
import { setCourse, setStep } from "../../../slices/courseSlice";
import ChipInput from "./chipinput";
import Requirementc from "./requirement";
import Upload from "./upload";
import {useForm} from "react-hook-form"
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";

const CourseInformation=()=>{
    const {
        register,
        handleSubmit,
        setValue,
        getValues, 
        formState:{errors}
    }=useForm();
    const dispatch=useDispatch();
    const {course,editCourse}=useSelector((state)=>state.course);
    const [courseCategories,setCourseCategories]=useState([]);
    const{token}=useSelector((state)=>state.auth);
    useEffect(()=>{
        const getCategories=async()=>{
            const categories=await fetchCourseCategories();
            if(categories.length>0){
                setCourseCategories(categories);
            }
        }
        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
        getCategories();
    },[])
    const isFormUpdated=()=>{
        const currentValues=getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !==
              course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail){
                return true;
            }
        return false;
    } 


    const Submithandler= async(data)=>{
        if(editCourse){
            if(isFormUpdated()){
                const currentValue=getValues();
                const formData=new FormData();
                formData.append("courseId",course._id); 
                if(currentValue.courseTitle!==course.courseName){
                    formData.append("courseName",data.courseTitle)
                }
                if(currentValue.courseShortDesc!==course.courseDescription){
                    formData.append("courseDescription",data.courseShortDesc)
                }
                if(currentValue.coursePrice!==course.price){
                    formData.append("price",data.coursePrice)
                }
                if (currentValue.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if(currentValue.courseBenefits!==course.whatYouWillLearn){
                    formData.append("whatYouWillLearn",data.courseTitle)
                }
                if(currentValue.courseCategory!==course.category._id){
                    formData.append("category",data.courseCategory)
                }
                if(currentValue.courseRequirements.toString()!==course.instructions.toString()){
                    formData.append("instructions",JSON.stringify(data.courseRequirements)); 
                }
                if(currentValue.courseImage!==course.thumbnail){
                    formData.append("thumbnailImage",data.courseImage)
                } 
                const result=await editCourseDetails(formData,token);
                if(result){
                    setStep(2);
                    dispatch(setCourse(result));
                }
            }
            else {
                toast.error("No Changes made to the Form")
            }
            return;
        }
        const formData=new FormData();
        // formData.append("courseName",data.courseTitle);
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", "Draft")
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)
        const result=await addCourseDetails(formData,token);
        if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        
    }
    return (
        <form onSubmit={handleSubmit(Submithandler)}>
            <div>
                <label> Course Title</label>
                <input
                id="courseTitle"
                placeholder="Enter Course Title"
                {...register("courseTitle",{required:true})}
                className='w-full'
                />
                {
                    errors.courseTitle&&(<span>
                        Course Title is Required
                    </span>)
                }

            </div>
            <div>
                <label>Course Short Description</label>
                <textarea
                id="courseShortdesc"
                placeholder="Enter Description"
                {...register("courseShortDesc",{required:true})}
                className='min-h-[140px] w-full'
                ></textarea>
                {
                    errors.courseShortDesc &&(<span>
                        Course Description is required
                    </span>)
                }
            </div>
                
            <div>
                <label>Course Price</label>
                <textarea
                id="coursePrice"
                placeholder="Enter Course Price"
                {...register("coursePrice",{
                    required:true,
                    valueAsNumber:true
                })}
                className='min-h-[140px] w-full'
                ></textarea>
                {
                    errors.coursePrice &&(<span>
                        Course Price is required
                    </span>)
                }

            </div>
            <div>
                <label>Course Category</label>
                <select
                id="courseCategory"
                {...register("courseCategory",{required:true})}
                >
                    {
                        courseCategories.map((elem,index)=>{

                            return (<option key={index} value={elem?._id}>
                                {elem?.name}
                            </option>);
                        })
                    }
                </select>
                {errors.courseCategory && (<span>
                    Course Category is required
                </span>)}
            </div>
            <ChipInput label={"Tags"} name="courseTags" placeholder={"Enter Tags and press Enter"} register={register} errors={errors} setValue={setValue} getValues={getValues}></ChipInput>
            <Upload name={"courseImage"} label="Course thumbnail" register={register} setValue={setValue} errors={errors} editData={editCourse?course?.thumbnail:null} ></Upload>
            <div>
                <label>Benefits of the Course</label>
                <textarea
                id="coursebenefits"
                placeholder="Enter Benefits Of the Course"
                {...register("courseBenefits",{required:true})}
                className='min-h-[130px] w-full'
                >
                </textarea>
                {errors.courseBenefits && (<span>
                    Benefits of the course are required
                </span>)}
            </div>
            <Requirementc name='courseRequirements' label='Requirements/Instructions' register={register} setValue={setValue} errors={errors} getValues={getValues}></Requirementc> 
            <div>
                { 
                    editCourse && (
                        <button
                        onClick={()=> dispatch(setStep(2))}
                        className='flex items-center gap-x-2 bg-black text-white'
                        >
                            Continue Without Saving
                        </button>
                    )
                
                }
                <button type="submit">
                    {/* {!editCourse? "Next":"Save Changes"} */}
                    Next
                </button>  
            </div>

             
        </form>    
    )
}
export default CourseInformation;
import React from "react";
import {useForm} from "react-hook-form"
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "./upload";
import { useEffect } from "react";

const SubSectionModal=({modalData,setModalData,add=false,view=false,edit=false})=>{
    const
    {   
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    }=useForm();    
    const dispatch=useDispatch();
    const {course}=useSelector((state)=>state.course);
    const{token}=useSelector((state)=>state.auth)
    useEffect(()=>{
        if(view||edit){
            setValue("lectureTiTle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);
        }
    },[])
    const isFormUpdated=()=>{
        const currentValues=getValues();
        if(currentValues.lectureTitle!==modalData.title||currentValues.lectureDesc!==modalData.description||currentValues.lectureVideo!==modalData.videoUrl){
          return true;         
        }
        return false;
    }
    const handleEditSubSection = async()=>{
        const currentValues=getValues();
        const formData=new FormData();
        formData.append("sectionId",modalData.sectionId);
        formData.append("subSectionId",modalData._id);
        if(currentValues.lectureTitle!==modalData.title){
            formData.append("title",currentValues.lectureTitle);
        }
        if(currentValues.lectureDesc!==modalData.description){
            formData.append("description",currentValues.lectureDesc);
        }
        if(currentValues.lectureVideo!==modalData.videoUrl){
            formData.append("video",currentValues.lectureVideo);
        }
        const result=await updateSubSection(formData,token);
        if(result){
            const updatedCourseContent=course.courseContent.map((section)=>section._id===modalData.sectionId?result:section);
            const updatedCourse={...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
    }
    const onSubmit=async(data)=>{
        if(view){
            return;
        }
        if(edit){
            if(!isFormUpdated){
                toast.error("No changes made to the Form")
                return;
            }else{
                handleEditSubSection();
            }
            return;
        }
        const formData=new FormData();
        formData.append("sectionId",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDesc)
        formData.append("video",data.lectureVideo);
        const result=await createSubSection(formData,token);
        if(result){
            const updatedCourseContent=course.courseContent.map((section)=>section._id===modalData?result:section);
            const updatedCourse={...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
    }
    
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-30 backdrop-blur-sm border-2">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-black text-black bg-white">
                <div className="flex items-center justify-between rounded-t-lg p-5">
                <p className="text-xl font-semibold text-black">{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                <button onClick={()=>setModalData(null)}>
                    <RxCross1 className="text-2xl text-black"></RxCross1>
                </button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10 w-[650px] bg-white text-black text-bold">
                <Upload name={"lectureVideo"} label="Lecture Video" register={register} setValue={setValue} errors={errors} video={true} viewData={view?modalData.videoUrl:null} editData={edit?modalData.videoUrl:null}></Upload>
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-black text-bold">Lecture Title</label>
                    <input id="lectureTitle" placeholder="Enter Lecture Title" {...register("lectureTitle",{required:true})} className="form-style w-full">
                     </input>
                     {errors.lectureTitle && (<span>
                        Lecture Title is required
                     </span>)}
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-black text-bold">Lecture Description</label>
                    <textarea
                    id="lectureDesc"
                    placeholder="Enter Lecture Description"
                    {...register("lectureDesc",{required:true})}
                    className="form-style resize-x-none min-h-[130px] w-full"
                    >
                    </textarea>
                    {
                        errors.lectureDesc && (<span>
                            Lecture Description is not added
                        </span>)
                    }
                </div>
                {
                    !view && (
                        <div className="flex justify-end">
                            <button type="submit">{edit?"Save Changes":"Save"}</button>
                        </div>
                    )
                }
            </form>
        </div>
    );
}
export default SubSectionModal;
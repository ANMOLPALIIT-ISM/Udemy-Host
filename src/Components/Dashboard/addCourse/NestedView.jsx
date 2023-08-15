import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {RxDropdownMenu} from 'react-icons/rx'
import {MdEdit} from "react-icons/md"
import {RiDeleteBin6Line} from "react-icons/ri"
import {BiSearch, BiSolidDownArrow} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"
import SubSectionModal from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../slices/courseSlice";
const NestedView=({handleChangeEditSectionName})=>{
    const {course}=useSelector((state)=>state.course);
    const{token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const [addSubSection,setAddSubSection]=useState(null);
    const [viewSubSection,setViewSubSection]=useState(null);
    const [editSubSection,setEditSubSection]=useState(null);
    const handleDeleteSection=async(sectionId)=>{
        const result=await deleteSection({sectionId,courseId:course._id,token});
        if(result){
            dispatch(setCourse(result));
        }

    }
    const handleDeleteSubsection=async(subSectionId,sectionId)=>{
        const result=await deleteSubSection({subSectionId,sectionId,token});
        if(result){
            const updatedCourseContent=course.courseContent.map((section)=>section._id===sectionId?result:section);
            const updatedCourse={...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
    }
    return (
        <div>
            <div className="rounded-lg bg-black p-6 px-8">
                {course?.courseContent?.map((section)=>{
                    return (
                        <details key={section._id} open>
                            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-black py-2">
                                <div className="flex items-center gap-x-3">
                                    <RxDropdownMenu className="text-2xl text-white"></RxDropdownMenu>
                                    <p className="font-semibold text-white">{section.sectionName}</p>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <button onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}>
                                    <MdEdit className="text-xl text-white"></MdEdit>
                                    </button>
                                    <button onClick={()=>handleDeleteSection(section._id)}>
                                        <RiDeleteBin6Line className="text-xl text-white"></RiDeleteBin6Line>
                                    </button>
                                    <span className="font-medium text-white">|</span>
                                    <BiSolidDownArrow className={`text-xl text-white`}></BiSolidDownArrow>
                                </div>
                                
                            </summary>
                            <div className="px-6 pb-4">
                                {
                                    section?.subSection?.map((data)=>{
                                        return (
                                            <div key={data?._id} onClick={()=>setViewSubSection(data)} className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-black py-2">
                                            <div className="flex items-center gap-x-3 py-2 ">
                                                <RxDropdownMenu className="text-2xl text-white"></RxDropdownMenu>
                                                <p className="font-semibold text-white">{data.title}</p>
                                            </div> 
                                            <div className="flex items-center gap-x-3" onClick={(e)=>e.stopPropagation()}>
                                                <button onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
                                                <MdEdit className="text-xl text-white"/>
                                                </button>
                                                <button onClick={()=>handleDeleteSubsection(data._id,section._id)}>
                                                    <RiDeleteBin6Line className="text-xl text-white"></RiDeleteBin6Line>
                                                </button>
                                            </div> 

                                        </div>
                                        );
                                    })
                                }
                                <button onClick={()=>setAddSubSection(section._id)} className="mt-3 flex items-center gap-x-1 text-white">
                                    <AiOutlinePlus className="text-lg"></AiOutlinePlus>
                                    <p>Add Lecture</p>
                                </button>
                            </div>
                        </details>

                    );
                })}
            </div>
            {addSubSection?(<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}></SubSectionModal>):viewSubSection?(<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}></SubSectionModal>):editSubSection?(<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}></SubSectionModal>):(<div></div>)}

        </div>
    );
}
export default NestedView;
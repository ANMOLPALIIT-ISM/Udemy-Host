import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
const VideoDetailsSideBar=({setReviewModal})=>{
    const [activeStatus,setActiveStatus]=useState("");
    const [videobarActive,setVideobarActive]=useState("");
    const location =useLocation();
    const navigate=useNavigate();
    const {sectionId,subSectionId}=useParams();
    const{
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    }=useSelector((state)=>state.viewCourse)
    useEffect(()=>{
        const setActiveVideoAndSection=()=>{
            if(!courseSectionData.length){
                return;
            }
            const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId);
            const currentSubSectionIndex=courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data)=>data._id===subSectionId)
            const activeSubSectionId=courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            setVideobarActive(activeSubSectionId);
            
        }
        setActiveVideoAndSection();    
    },[courseSectionData,courseEntireData,location.pathname])
    return (
        <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-white bg-black text-white">
            <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-white py-5 text-lg font-bold ">
                <div className="flex w-full items-center justify-between ">
                    <div>
                    <div onClick={()=>navigate("/dashboard/enrolled-courses")} className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-black p-1 text-white hover:scale-90'>
                        Back
                    </div>
                    <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white p-1 text-xs text-black hover:scale-90">
                         <button onClick={()=>setReviewModal(true)}>
                            Add Review
                            </button>   
                     </div>
                    </div>
                    <div className="flex flex-col">
                        <p>{courseEntireData?.courseName}</p>
                        <p className="text-sm font-semibold text-white">{completedLectures?.length}/{totalNoOfLectures}</p>

                    </div>
                </div>
                <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                    {
                        courseSectionData.map((section,index)=>{
                            return (
                                <div onClick={()=>setActiveStatus(section?._id)} key={index} className='mt-2 cursor-pointer text-sm text-white'>
                                    <div>
                                        <div className="w-[70%] font-semibold">
                                            {section?.sectionName}
                                        </div>  
                                     </div>   
                                     <div className="flex items-center gap-3">
                                        {
                                            activeStatus===section?._id && (
                                                <div className="transition-[height] duration-500 ease-in-out">

                                                    {section.subSection.map((sub,index) => {
                                                        return (
                                                        <div className={`flex gap-5 p-5 ${videobarActive===sub?._id?"bg-white text-black w-full":"bg-black text-white w-full"}`} key={index}
                                                        onClick={()=>{
                                                            navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${sub?._id}`)
                                                            setVideobarActive(sub?._id);
                                                        }}
                                                        >
                                                            <input type={"checkbox"} checked={completedLectures.includes(sub?._id)} 
                                                            ></input>
                                                            <span>
                                                                {sub?.title}
                                                            </span>
                                                        </div>)

                                                    })
                                                    }
                                                </div>    
                                            )
                                        }
                                      </div>  
                                 </div>   
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );

}
export default VideoDetailsSideBar;
import React, { useRef } from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../../slices/viewCourseSlice";
import {Player} from "video-react"
import 'video-react/dist/video-react.css'
import {AiFillPlayCircle} from "react-icons/ai"
import { markLectureAsComplete } from "../../services/operations/courseDetailsAPI";
const VideoDetails=()=>{
    const {courseId,sectionId,subSectionId}=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const playerRef=useRef();
    const {token}=useSelector((state)=>state.auth);
    const {courseSectionData,courseEntireData,completedLectures}=useSelector((state)=>state.viewCourse);

    const [videoData,setVideoData]=useState([]);
    const [previewSource,setPreviewSource]=useState("");
    const [videoEnded,setVideoEnded]=useState(false);
    useEffect(()=>{
        const setVideoSpecificDetails=async()=>{
            if(!courseSectionData.length){
                return;
            }
            if(!courseId && !sectionId && !subSectionId){
                navigate("/dashboard/enrolled-courses");
            }
            else{
                const filteredData=courseSectionData.filter((course)=>course._id===sectionId)
                const filteredVideoData=filteredData?.[0].subSection.filter((data)=>data._id===subSectionId);
                setVideoData(filteredVideoData[0]);
                setPreviewSource(courseEntireData.thumbnail)
                setVideoEnded(false);
            }
        }
        setVideoSpecificDetails();
    },[courseSectionData,courseEntireData,location.pathname]);
    const isFirstVideo=()=>{
        const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId);
        const subSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId);
        if(currentSectionIndex ===0 && subSectionIndex===0){
            return true;
        }
        return false;
    }
    const isLastVideo=()=>{
        const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId);
        const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;
        const subSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId);
        if(currentSectionIndex===courseSectionData.length-1 && subSectionIndex===noOfSubSections-1)return true;
        return false;
    }
    const goToNextVideo=()=>{
        const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId);
        const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;
        const subSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId);
        if(subSectionIndex!==noOfSubSections-1){
            const nextSubSectionId=courseSectionData[currentSectionIndex].subSection[subSectionIndex+1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }
        else{
            const nextSectionId=courseSectionData[currentSectionIndex+1]._id;
            const nextSubSectionId=courseSectionData[currentSectionIndex+1].subSection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }
    const goToPrevVideo=()=>{
        const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId);
        const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;
        const subSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId);
        if(subSectionIndex!=0){
            const prevSubSectionId=courseSectionData[currentSectionIndex].subSection[subSectionIndex-1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        else{
            const prevSectionId=courseSectionData[currentSectionIndex-1]._id;
            const prevSectionlength=courseSectionData[currentSectionIndex-1].subSection.length;
            const prevSubSectionId=courseSectionData[currentSectionIndex-1].subSection[prevSectionlength-1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }
    const handleLectureCompletion=async()=>{
            const res=await markLectureAsComplete({courseId:courseId,subSectionId:subSectionId},token);
            if(res){
                dispatch(updateCompletedLectures(subSectionId));
            }
    }
    return (
        <div className="flex flex-col gap-5">
            {
                !videoData?(<img
                src={previewSource}
                className='h-full w-full rounded-md object-cover'
                />):(
                    <Player 
                    ref={playerRef}
                    aspectRatio="16:9"
                    playsInline
                    onEnded={()=>setVideoEnded(true)}
                    src={videoData?.videoUrl}
                    >
                        <AiFillPlayCircle position="center"></AiFillPlayCircle>
                        {
                            videoEnded && (
                                <div style={{
                                    backgroundImage:
                                      "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                                  }}
                                  className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
                                    {
                                        !completedLectures.includes(subSectionId) && (
                                            <button onClick={()=>handleLectureCompletion()} className='text-center text-[13px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 border-2'>
                                                Mark As Completed
                                            </button>
                                        )
                                    }
                                    <button onClick={()=>{
                                        if(playerRef?.current){
                                            playerRef?.current?.seek(0);
                                            setVideoEnded(false);
                                        }
                                    }}
                                    className='text-center text-[13px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 border-2'
                                    >
                                        Rewatch
                                    </button>
                                    
                                        {
                                            !isFirstVideo() && (
                                                <button onClick={goToPrevVideo} className='text-center text-[13px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 border-2'>
                                                        Previous
                                                </button>
                                            )
                                        }
                                        {
                                            !isLastVideo()&&(
                                                <button onClick={goToNextVideo} className='text-center text-[13px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 border-2'>
                                                    Next
                                                </button>
                                            )
                                        }

                                </div>
                            )
                        }
                    </Player>
                )
            }
            <h1>{videoData?.title}</h1>
            <p>{videoData?.description}</p>
        </div>
    )
}
export default VideoDetails;
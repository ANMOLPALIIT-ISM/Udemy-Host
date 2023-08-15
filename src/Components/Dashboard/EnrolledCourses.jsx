import React from "react";
import { getUserEnrolledCourses } from "../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar"
import { useState,useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";

const EnrolledCourses=()=>{
    const {token}=useSelector((state)=>state.auth);
    const [enrolledCourses,setEnrolledCourses]=useState(null);
    const navigate=useNavigate();
    const getEnrolledCourses=async()=>{
        try{
            const response =await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }catch(error){
            console.log("Not able to fetch from getCoursesAPI");
        }
    }
    useEffect(()=>{
        getEnrolledCourses();
    },[]);
    return (
        <div>
            <div className="text-3xl text-black">Enrolled Courses</div>
             {
                !enrolledCourses?(
                <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                    <div className="spinner"> Loading</div>
                </div>):
                        !enrolledCourses.length?(
                        <p className="grid h-[10vh] w-full place-content-center text-black">You have purchased no Courses</p>):(
                            <div className="my-8 text-black">
                                <div className="flex rounded-t-lg text-black" >
                                    <p className="w-[45%] px-5 py-3">Course Name</p>
                                    <p className="w-1/4 px-2 py-3">Durations</p>               
                                    <p className="flex-1 px-2 py-3">Progress</p>
                                </div>
                                {
                                    enrolledCourses.map((course,i,arr)=>{
                                        return (
                                            <div className={`flex items-center border border-black ${
                                                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                              }`} key={i}>
                                                <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                                     onClick={() => {
                                                        navigate(
                                                        `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                        )
                                                     }}>

                                                <img src={course.thumbnail} className="h-14 w-14 rounded-lg object-cover"></img>
                                                <div className="flex max-w-xs flex-col gap-2">
                                                    <p className="font-semibold">{course.courseName}</p>
                                                    <p className="text-xs text-black">{course.courseDescription}</p>
                                                </div>
                                                </div>
                                                <div className="w-1/4 px-2 py-3">
                                                    {course?.totalDuration}
                                                 </div>   
                                                <div>
                                                    <p>Progess:  {course.progressPercentage||0}%</p>
                                                    <ProgressBar completed={course.progressPercentage||0
                                                    }
                                                    height='8px'
                                                    ></ProgressBar>
                                                </div>
                                             </div>   
                                        )
                                    })
                                }
                            </div>
                        )
             }   
        </div>
    )
}
export default EnrolledCourses
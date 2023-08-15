import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import { getFullDetailsOfCourse } from "../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../slices/courseSlice";
import RenderSteps from "../addCourse/RenderSteps";
import { useEffect } from "react";
export default function EditCourse(){
    const dispatch=useDispatch();
    const {courseId}=useParams();
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    useEffect(()=>{
        const populateCourseDetails=async()=>{
            const result=await getFullDetailsOfCourse(courseId,token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
        }
        populateCourseDetails();
    },[])
    return (
        <div>
            <h1>Edit Course</h1>
            <div>
                {
                    course? (<RenderSteps/>):(<p>Course Not Found</p>)
                }
            </div>
        </div>
    );
}
import React, { useEffect } from "react"
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../services/operations/courseDetailsAPI";
import CourseTable from "./CourseTable";
import { useState } from "react";
const MyCourses=()=>{
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const [courses,setCourses]=useState([]);
    useEffect(()=>{
        const fetchCourses=async()=>{
            const result=await fetchInstructorCourses(token);
            if(result){
                setCourses(result?.data);
            }
        }
        fetchCourses();
    },[])
    return (
        <div>
            <div>
                <h1>My Courses</h1>
                <button onClick={()=>navigate("/dashboard/add-course")} className='border-2 bg-black text-white p-3 m-3'>
                    Add Courses
                </button>
            </div>
            {
                courses && <CourseTable courses={courses} setCourses={setCourses}></CourseTable>
            }
        </div>
    );
}
export default MyCourses;
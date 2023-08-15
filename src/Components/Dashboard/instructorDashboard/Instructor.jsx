import React, { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import { Link } from "react-router-dom";
import { getInstructorData } from "../../../services/operations/profileAPI";
import InstructorChart from "./InstructorChart";
const Instructor=()=>{
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const [instructorData,setInstructorData]=useState(null);
    const [courses,setCourses]=useState([]);
    useEffect(()=>{
        const getCourseDataWithStats=async()=>{
            const instructorApiData=await getInstructorData(token);
            const result=await fetchInstructorCourses(token);
            if(instructorApiData.length){
                setInstructorData(instructorApiData);
            } 
            if(result){
                setCourses(result?.data)
            }

        }

        getCourseDataWithStats();
    },[])
    const totalAmount=instructorData?.reduce((acc,curr)=>acc+curr.totalAmountGen,0);
    const totalStudents=instructorData?.reduce((acc,curr)=>acc+curr.totalStudentsEnrolled,0);

    return (
        <div>
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-black">Hi {user?.firstName}</h1>
                <p className="font-medium text-black">Let's Start Something New</p>
            </div>
            {
                courses.length>0?(
                <div>
                    <div className="my-4 flex h-[450px] space-x-4">
                    <InstructorChart courses={instructorData}/>
                    <div className="flex min-w-[250px] flex-col rounded-md p-6">
                        <p className="text-lg font-bold text-black">Statistics</p>
                        <div className="mt-4 space-y-4">
                        <div>
                            <p className="text-lg text-black">Total Courses</p>
                            <p className="text-3xl font-semibold text-black">{courses?.length}</p>
                        </div>
                      
                      <div>
                        <p className="text-lg text-black">Total Students</p>
                        <p className="text-3xl font-semibold text-black">{totalStudents}</p>
                        </div>
                        <div>
                            <p className="text-lg text-black">Total Income</p>
                            <p className="text-3xl font-semibold text-black">Rs. {totalAmount}</p>
                        </div>
                        </div>  
                    </div> 
                    </div>
                    <div className="rounded-md p-6">
                        
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-black">Your Courses</p>
                            <Link to="/dashboard/my-courses">
                                <p className="text-xs font-semibold text-black">View All</p>
                            </Link>
                        </div>
                        <div className="my-4 flex items-start space-x-6">
                            {
                                courses.slice(0,3).map((course)=>{
                                    return (
                                        <div key={course._id} className='w-1/3'>
                                            <img src={course?.thumbnail}
                                            className="h-[201px] w-full rounded-md object-cover"
                                            />
                                            <div className="mt-3 w-full">
                                                <p className="text-sm font-medium text-black">{course?.courseName}</p>
                                                <div className="mt-1 flex items-center space-x-2">
                                                    <p className="text-xs font-medium text-black">{course.studentsEnrolled.length} students</p>
                                                    <p>|</p>
                                                    <p className="text-xs font-medium text-black">Rs {course?.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                </div>
                ):(
                    <div className="mt-20 rounded-md p-6 py-20">
                        <p className="text-center text-2xl font-bold text-black">You have not Created a course</p>
                        <Link to={"/dashboard/addCourse"}>
                            <p className="mt-1 text-center text-lg font-semibold text-black">Create A Course</p>
                        </Link>
                        </div>
                )
            }
        </div>
    );
}
export default Instructor;
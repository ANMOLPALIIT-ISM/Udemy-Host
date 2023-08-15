import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Table,Thead,Tr,Th,Td,Tbody,} from "react-super-responsive-table"
import { deleteCourse, fetchInstructorCourses } from "../../services/operations/courseDetailsAPI";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useNavigate } from "react-router-dom";
const CourseTable=({courses,setCourses})=>{
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth);
    const handleCourseDelete=async(courseId)=>{
        await deleteCourse({courseId:courseId},token);
        const result=await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }
    }   
    const navigate=useNavigate();
    if(!courses){
        return (
            <div>
                Please Wait....
            </div>
        )
    }
    return (
        <div>
            <Table className='rounded-xl border border-black'>
                <Thead>
                    <Tr className='flex gap-x-10 rounded-t-md border-b border-b-black px-6 py-2'>
                        <Th className='flex-1 text-left text-sm font-medium uppercase text-black'>
                            Courses
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-black'>
                            Duration
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-black'>
                            Price
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-black'>
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        (courses?.length===0) ? (
                            <Tr>
                                <Td className='py-10 text-center text-2xl font-medium text-black'>
                                    No Courses Found
                                </Td>
                            </Tr>
                        ):(
                            
                            courses?.map((course,index)=>
                            {
                                return (
                                    <Tr key={index} className='flex gap-x-10 border-b border-black px-6 py-8'>
                                        <Td className='flex flex-1 gap-x-4'>
                                            <img src={course?.thumbnail} className='h-[148px] w-[220px] rounded-lg object-cover'/>
                                            <div className='flex flex-col justify-between'>
                                                <p className="text-lg font-semibold text-black">{course.courseName}</p>
                                                <p className="text-xs text-black">{course.courseDescription}</p>
                                                {
                                                    (course.status==="Draft" ) ? (<p>Drafted</p>):(<p>Published</p>)
                                                }
                                            </div>
                                        </Td>
                                        <Td className='text-sm font-medium text-black'>
                                            2hr 30min
                                        </Td>
                                        <Td className='text-sm font-medium text-black'>
                                                Rs. {course.price}
                                        </Td>
                                        <Td className='text-sm font-medium text-black'>
                                            <button onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)} className='px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300'>
                                                EDIT    
                                            </button>
                                            <button onClick={()=>handleCourseDelete(course._id)} className='px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300'>
                                                Delete
                                            </button>    
                                        </Td> 
                                    </Tr>
                                )   
                            })
                        )
                    }
                </Tbody>
            </Table>
        </div>
    );
}
export default CourseTable;
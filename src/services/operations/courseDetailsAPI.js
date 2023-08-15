import {toast} from "react-hot-toast"
import { updateCompletedLectures } from "../../slices/viewCourseSlice"
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"
const{
    COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
}=courseEndpoints
export const getAllCourses=async()=>{
    let result=[];
    try{
        const response=await apiConnector("GET",GET_ALL_COURSE_API);
        if(!response.data.success){
            throw new Error("Could Not Fetch The Courses");
        }
        result=response?.data?.data;
    }catch(err){
        toast.error("Could Not Fetch The Courses");
    }
    return result;
}
export const fetchCourseDetails=async(courseId)=>{
    let result=null;
    try{
        const response=await apiConnector("POST",COURSE_DETAILS_API,{courseId:courseId})
        // console.log(response);
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        result=response?.data;
    }catch(err){
        toast.error("Could Not Get Course Details");
    }
    return result;
}
export const fetchCourseCategories=async()=>{
    let result=[];
    try{
        const response =await apiConnector("GET",COURSE_CATEGORIES_API);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result=response?.data?.data;
    }
    catch(err){
        toast.error("Could Not Fetch Course Categories")
    }
    return result;
}
export const addCourseDetails=async(data,token)=>{
    let result=null;
    try{
        const response=await apiConnector("POST",CREATE_COURSE_API,data,{Authorization:`Bearer${token}`})
       
        if(!response?.data?.success){
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully");
        result=response?.data?.data
    }catch(err){
        toast.error(err.message);   
    }
    return result;
}
export const editCourseDetails=async(data,token)=>{
    let result=null;
    try{
        const response=await apiConnector("POST",EDIT_COURSE_API,data,{Authorization:`Bearer${token}`});
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Course Updated Successfully");
        result=response?.data?.data;
    }catch(err){
        toast.error(err.message);
    }
    return result;
}
export const createSection=async(data,token)=>{
    let result=[];
    try{
        const response= await apiConnector("POST",CREATE_SECTION_API,data,{Authorization:`Bearer${token}`});
        if(!response?.data?.success){
            throw new Error("Could Not create a section");
        }
        toast.success("Course Section Created");
        result=response?.data?.updatedCourse;
    }catch(err){
        toast.error(err.message);
    }
    return result;
}
export const createSubSection =async(data,token)=>{
    let result=null;
    try{
        const response= await apiConnector("POST",CREATE_SUBSECTION_API,data,{Authorization:`Bearer${token}`});
       
        if(!response?.data?.success){
            throw new Error("Could Not Add Lecture");
        }
        toast.success("Lecture Added");
        result=response?.data?.data;
    }catch(err){
        toast.error(err.message);
    }   
    return result;
}

export const updateSection =async(data,token)=>{
    let result=null;

    try{
        const response= await apiConnector("POST",UPDATE_SECTION_API,data,{Authorization:`Bearer${token}`});
        if(!response?.data?.success){
            throw new Error("Could Not update Section");
        }    
        toast.success("Course Section updated");
        result =response?.data?.data;
        
    }catch(err){
        toast.error(err.message);
    }
    return result;
}

export const updateSubSection =async(data,token)=>{
    let result=null;
    try{
        const response= await apiConnector("POST",UPDATE_SUBSECTION_API,data,{Authorization:`Bearer${token}`});
        if(!response?.data?.success){
            throw new Error("Could Not Update Lecture");
        }
        toast.success("Lecture Updated");
        result=response?.data?.data;
    }catch(err){
        toast.error(err.message);
    }
    return result;
}
export const deleteSection =async(data,token)=>{
    let result=null;
    try{    
        const response= await apiConnector("POST",DELETE_SECTION_API,data,{Authorization:`Bearer${token}`});
        if(!response?.data?.success){
            throw new Error("Could not Delete the section");
        }
        toast.success("Course Section Deleted");
        result=response?.data?.data;

    }catch(err){
        toast.error(err.message);
    }
    return result;
}
export const deleteSubSection =async(data,token)=>{
    let result=null;

    try{
        const response= await apiConnector("POST",DELETE_SUBSECTION_API,data,{Authorization:`Bearer${token}`});
        if(!response?.data?.success){
            throw new Error("Could Not delete Lecture")
        }
        toast.success("Lecture Deleted")
        result=response?.data?.data;
    }catch(err){
        toast.error(err.message);
    }
    return result;
}
export const fetchInstructorCourses=async(token)=>{
    let result=[];
    try{
        const response=await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,{Authorization:`Bearer${token}`});
        
        if(!response?.data?.success){
            throw new Error("Could Not fetch Instructor Courses");
        }
        toast.success("Instructor Courses Fetched");
        result=response?.data;
    }catch(err){
        toast.error(err.message);
    }
    return result;
}
export const deleteCourse=async(data,token)=>{
    try{
        const response= await apiConnector("DELETE",DELETE_COURSE_API,data,{Authorization:`Bearer${token}`})
        if(!response?.data?.success){
            throw new Error("Could Not delete Course");
        }
        toast.success("Course Deleted Successfully")
    }catch(err){
        toast.error(err.message);
    }
}
export const getFullDetailsOfCourse= async(courseId,token)=>{
    let result=null;
    try{
        const response= await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId},{Authorization:`Bearer${token}`});
       
        if(!response?.data?.success){
            throw new Error("Could Not Fetch Course Details")
        }
        result=response?.data?.data;
    }catch(err){
        toast.error(err.message)
    }
    return result;
}
export const markLectureAsComplete=async(data,token)=>{
    let result=null;
    try{
        const response=await apiConnector("POST",LECTURE_COMPLETION_API,data,{Authorization:`Bearer${token}`});
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        toast.success("Lecture Completed");
        result=true;
    }catch(err){
        console.log(err);
        toast.error(err.message);
        result=false;
    }
    return result;


}
export const createRating=async(data,token)=>{
    let success=false;
    try{
        const response=await apiConnector("POST",CREATE_RATING_API,data,{Authorization:`Bearer${token}`});
        if(!response?.data?.success){
            throw new Error("Could Not Create Rating");
        }
        toast.success("Rating Created");
        success=true
    }
    catch(err){

        success=false;
        toast.error(err.message);

    }
    return success;
}
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"
import { setUser } from "../../slices/profileSlice"
const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API ,GET_INSTRUCTOR_DATA_API} = profileEndpoints
export function getUserDetails(token,navigate){
    return async(dispatch)=>{
        try{
            const response=await apiConnector("GET",GET_USER_DETAILS_API,null,{Authorization:`Bearer${token}`})
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            const userImage=response.data.data.image?response.data.data.image:`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            dispatch(setUser({...response.data.data,image:userImage}))    



        }catch(err){
            dispatch(logout(navigate));
            toast.error("Could Not get User Details")

        }
    }
}
export async function getUserEnrolledCourses(token){
    let result=[];
        try{
            const response=await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,null,{Authorization:`Bearer${token}`});
          
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            result=response.data.data;
        }catch(err){
            toast.error("Could not Get Enrolled Courses");
        }
    return result;
}
export async function getInstructorData(token){
    let result=[];
    try{
        const response=await apiConnector("GET",GET_INSTRUCTOR_DATA_API,null,{Authorization:`Bearer${token}`})
        if(!response?.data?.success){
            throw new Error("Not able to fetch Instructor Data")
        }
        result=response?.data?.courses;
    }
    catch(err){
        console.log("error in in dash",err);
        toast.error("Not able to fetch instructor Data")
    }
    return result;
}
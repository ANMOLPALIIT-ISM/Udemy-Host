import { toast } from "react-hot-toast";
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"
const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
  } = settingsEndpoints
export function updateDisplayPicture(token,formData){
    return async(dispatch)=>{
        try{
            const response=await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,{"Content-Type": "multipart/form-data",Authorization:`Bearer${token}`})
            if(!response.data.success){
                throw new Error("response.data.message");
            }
            toast.success("Display Picture updated Successfully");
            dispatch(setUser(response.data.data));
        }catch(err){
            toast.error("Could not Update Display Picture");
        }
    }
}
export function updateProfile(token,formData){
    return async(dispatch)=>{
        try{
            const response=await apiConnector("PUT",UPDATE_PROFILE_API,formData,{Authorization:`Bearer${token}`})
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setUser(response.data.updatedUserDetails));
            toast.success("Profile Updated Successfully")

        }catch(err){
            toast.error("Could not Update Profile");
        }
    }
}
export function changePassword(token,formData){
    return async(dispatch)=>{
        try{
            const response=await apiConnector("PUT",CHANGE_PASSWORD_API,formData,{Authorization:`Bearer${token}`});
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Password changed successfully")
        }catch(err){
            toast.error("Could Not change the Password");
        }
    }
}
export function deleteProfile(token,navigate){
    return async(dispatch)=>{
        try{
            // toast.success(token);
            const response= await apiConnector("DELETE",DELETE_PROFILE_API,null,{Authorization:`Bearer${token}`});
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Account Deleted Successfully");
            dispatch(logout(navigate));
        }
        catch(err){
            toast.error(err.message);
        }
    }
}
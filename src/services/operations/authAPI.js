import {endpoints} from "../apis"
import { toast } from "react-hot-toast";
import {setToken} from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"

const {SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,}=endpoints
export function sendOtp(email,navigate){
    return async(dispatch)=>{
        try{
            const response= await apiConnector("POST",SENDOTP_API,{email});
            if(!response.data.success){
                throw new Error(response.data.success);
            }
            toast.success("OTP SEND TO YOUR EMAIL");
            navigate("/verify-email");
        }
        catch(err){
            toast.error("Could not send the OTP");

        }
    }
}
export function signUp(accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate){
        return async(dispatch)=>{
            try{
                const response = await apiConnector("POST", SIGNUP_API, {
                    accountType,
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    otp,
                  })
                  if (!response.data.success) {
                    throw new Error(response.data.message)
                  }
                  toast.success("Signup Successful")
                  navigate("/login")  
            }
            catch(err){
                toast.error("Signup Failed")
                navigate("/signup")
            }
        }
    }
export function login(email,password,navigate){
    return async(dispatch)=>{
        try{
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        navigate("/dashboard")
        }catch(err){
            console.log(err);
            toast.error("Login Failed")
        }
    }
}
export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        try{
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
              })
              if (!response.data.success) {
                throw new Error(response.data.message)
              }
              toast.success("Reset Email Sent")
              setEmailSent(true)    
        }catch(err){
            toast.error("Failed To Send Reset Email")
        }

    }
}
export function resetPassword(password, confirmPassword, token) {
    return async(dispatch)=>{
        try{
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
              })
              if (!response.data.success) {
                throw new Error(response.data.message)
              }
              toast.success("Password Reset Successfully")
            //   navigate("/login")

        }catch(err){
            toast.error("Failed To Reset Password")
        }
    }
}
export function logout(navigate) {
   return (dispatch)=>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
   }    
}    
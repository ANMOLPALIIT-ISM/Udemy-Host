import React, { useState } from "react"
import { useStore } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";
const ForgotPassword=()=>{
    const [emailSent,setEmailSent]=useState(false);
    const[email,setEmail]=useState("");
    const dispatch=useDispatch();
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }
    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-black">
                {
                    !emailSent?"Reset your password":"check your email"
                }
            </h1>
            <p className="my-4 text-[1.125rem] leading-[1.625rem]">
                {
                    !emailSent?"Enter your email address, we will email you instructions to reset your passord":`We have send reset email to ${email}`
                }
            </p>
                <form onSubmit={handleOnSubmit}>
                    {
                        !emailSent && (
                            <label className="w-full"
                            ><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Email Address:</p>
                                <input required type={"email"} name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email address"></input>

                            </label>
                        )    
                        
                    }
                    <button type="submit" className="mt-6 w-full rounded-[8px] bg-black py-[12px] px-[12px] font-medium text-white">
                        {
                            !emailSent?"Reset Password":"Resend Email"
                        }
                    </button>
                </form>
                <div className="mt-6 flex items-center justify-between">
                <Link to="/login"><p className="flex items-center gap-x-2">Back to Login</p></Link>

                </div>
            </div>
            
        </div>
    );
}
export default ForgotPassword
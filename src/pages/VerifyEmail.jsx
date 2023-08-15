import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate} from "react-router-dom";
function VerifyEmail(){
    const [otp,setOtp]=useState("");
    const dispatch=useDispatch();
    const {signupData}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        
        const{accountType,firstName,lastName,email,password,confirmPassword}=signupData;
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }
    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            <div className="max-w-[500px] p-4">
                <h1 className="font-semibold text-[1.875rem]">
                    Verify Email
                </h1>
                <p className="text-[1.125rem] my-4">A verification code has been sent to you.Enter the code below</p>
                <form onSubmit={handleOnSubmit}>
                    <OtpInput value={otp} onChange={setOtp} numInputs={6} renderInput={(props)=><input{...props} placeholder="-" className="w-[48px] lg:w-[60px] border-5 bg-black rounded-[0.5rem] text-white aspect-square text-center focus:outline-8 focus:outline-white"/>}
                    containerStyle={{
                        justifyContent: "start",
                        gap: "6px",
                      }}>

                    </OtpInput>
                    <button type="submit" className="w-full bg-black py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-white">Verify Email</button>                   
                </form>
                <div className="mt-6 flex justify-between">
                <Link to="/login"><p className=" flex items-center gap-x-2">Back to Login</p></Link>
                <button className="flex items-center gap-x-2" onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>Resend it</button>
                </div>
            </div>
            
        </div>
    );
}
export default VerifyEmail
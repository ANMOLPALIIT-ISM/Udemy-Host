import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
// import { useNavigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
const UpdatePassword=()=>{
    const [formData,setFormData]=useState({password:"",newPassword:""});
    const [showpassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);    
    const {password,newPassword}=formData;
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleOnChange=(e)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }));
    }
   
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token=location.pathname.split("/").at(-1);
        dispatch(resetPassword(password,newPassword,token,navigate));
    }
    
    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="max-w-[500px] p-4 lg:p-8">
            
            <h1 className="text-[1.8rem] font-semibold leading-[2.3rem]">Choose New password</h1>
            <p className="my-4 text-[1.1rem] leading-[1.6rem]">Almost done.Enter your new password and you are all set</p>
            <form onSubmit={handleOnSubmit}>
                <label className="relative">
                    <p className="mb-1 text-[0.8rem] leading-[1.3rem]">New password</p>
                    <input required type={showpassword?"text":"password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className="w-full "
                    /> 
                    
                    <span onClick={()=>setShowPassword((prev)=>!prev)} className="absolute right-3 top-[25px] cursor-pointer">{
                        showpassword?<AiFillEyeInvisible fontSize={24}/>:<AiFillEye fontSize={24}/>
                    }
                    
                    </span>
                </label>
                <label className="relative mt-3 block">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem]">Confirm New password </p>
                    <input 
                        required 
                        value={newPassword}
                        onChange={handleOnChange}
                        name="newPassword"
                        type={showConfirmPassword?"text":"password"}
                        placeholder="Confirm Password"
                        className=" w-full"
                    />
                    <span onClick={()=>setShowConfirmPassword((prev)=>!prev)} className="absolute right-3 top-[25px] cursor-pointer">{
                        showConfirmPassword?<AiFillEyeInvisible fontSize={24}/>:<AiFillEye fontSize={24}/>
                     }
                    
                    </span>
                </label>
                <button type="submit" className="mt-6 w-full rounded-[8px] bg-black py-[12px] px-[12px] font-medium text-white">Reset password </button>
            </form>
        </div>
        </div>
        
    );

}
export default UpdatePassword
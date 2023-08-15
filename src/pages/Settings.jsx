import React from "react"
import { deleteProfile, updateDisplayPicture, updateProfile } from "../services/operations/settingsAPI";
import {useForm} from "react-hook-form"
import UpdatePassword from "../Components/settings/UpdatePassword";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useRef } from "react";
const genders=["Male","Female","Non-Binary","Prefer Not To Say","Other"]
const Settings=()=>{
    const navigate=useNavigate();
    const {token}=useSelector((state)=>state.auth);
    const{user}=useSelector((state)=>state.profile);
    const dispatch=useDispatch();
    const[image,setImage]=useState(null);
    const[preview,setPreview]=useState(null);
    const {register,handleSubmit,formState:{errors}}=useForm();
    const fileInputRef=useRef(null);
    const handleClick=()=>{
        fileInputRef.current.click();
    }
    const handleFileChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            setImage(file);
            setPreview(file);
        }
    }
    const previewFile=(file)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setPreview(reader.result);
        }
    }
    const handleFileUpload=()=>{
        try{
            const formData=new FormData();
            formData.append("displayPicture",image);
            dispatch(updateDisplayPicture(token,formData))
        }catch(err){
            console.log(err.message);
        }
    }
    const submitProfileForm=async(data)=>{
        try{
            dispatch(updateProfile(token,data));
        }
        catch(err){
            console.log(err.message);
        }
    }
    async function handleDeleteAccount(){
        try{
            dispatch(deleteProfile(token,navigate));    
        }catch(err){
            console.log(err.message);
        }
    }
    useEffect(()=>{
        if(image){
            previewFile(image);
        }
    },[image]);
    return (
       <div>
            <div>
            <div className="flex items-center justify-between rounded-md border-[1px] border-black  p-8 px-12">
            <div className="flex items-center gap-x-4">
                <img src={preview||user?.image} className='aspect-square w-[78px] rounded-full object-cover'>
                </img>
                <div className="space-y-2">
                   <p>Change Profile Picture</p>
                   <div className="flex flex-row gap-3">
                    <input type={"file"}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className='hidden'
                    accept="image/png,image/gif,image/jpeg"
                    >
                    </input>
                    <button
                    onClick={handleClick}
                    className='cursor-pointer rounded-md bg-black text-white py-2 px-5 font-semibold'
                    >
                        Select
                    </button>
                    <button onClick={handleFileUpload}>
                        Upload
                    </button>
                    </div> 

                </div>


                </div>


                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit(submitProfileForm)}>
                    <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-black p-8 px-12">
                        <h2 className="text-lg font-semibold text-black">
                            Profile Information
                        </h2>
                        <div className="flex flex-col gap-5 lg:flex-row">
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label className="lable-style">
                                    First Name
                                </label>
                                <input 
                                type={"text"}
                                name="firstName"
                                placeholder="Enter Your first Name"
                                {...register("firstName",{required:true})}
                                defaultValue={user?.firstName}    
                                >
                                </input>
                                {
                                    errors.firstName && (
                                        <span className="-mt-1 text-[12px] text-black">
                                             Please Enter Your First Name   
                                        </span>
                                    )
                                }

                            </div>
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label className="lable-style">
                                    Last Name
                                </label>
                                <input
                                type={"text"}
                                name="lastName"
                                placeholder="Enter Last Name"
                                className="form-style"
                                {...register("lastName",{required:true})}
                                defaultValue={user?.lastName}
                                >
                                </input>
                                {
                                    errors.lastName&&(
                                        <span className="-mt-1 text-[12px] text-black">
                                             Please Enter Your LastName   
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 lg:flex-row">
                            <div className="flex flex-col gap-2">
                                <label className="lable-style">
                                    Date Of Birth
                                </label>
                                <input
                                type={"text"}
                                name="dateOfBirth"
                                className="form-style"
                                {...register("dateOfBirth",{
                                    required:{
                                        value:true,
                                        message:"Please enter your date of birth"
                                    },
                                    max:{
                                        value:new Date().toISOString().split("T")[0],
                                        message:"Date of Birth cannot be in future"
                                    }

                                })} 
                                defaultValue={user?.additionalDetails?.dateOfBirth}   
                                >
                                {
                                    errors.dateOfBirth && (
                                        <span className="-mt-1 text-[12px] text-black">
                                            {errors.dateOfBirth.message}    
                                        </span>
                                    )
                                }
                                </input>

                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="lable-style">
                                    Gender
                                </label>
                                <select
                                type="text"
                                name="gender"
                                className="form-style"
                                {...register("gender",{required:true})}
                                defaultValue={user?.additionalDetails?.gender}
                                >
                                    {
                                        genders.map((elem,index)=>{
                                            return (
                                                <option key={index} value={elem}>
                                                    {elem}
                                                </option>
                                            );

                                        })
                                    }
                                </select>
                                {errors.gender && (
                                    <span className="-mt-1 text-[12px] text-black">
                                        Please enter your Date of Birth.
                                    </span>
                                )}
                            </div>


                        </div>
                        <div className="lex flex-col gap-5 lg:flex-row">
                           <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label className="lable-style">
                                    Contact-Number
                            </label>
                            <input
                            type={"tel"}
                            name="contactNumber"
                            placeholder="Enter Your Contact Number"
                            className="form-style"
                            {
                                ...register("contactNumber",{
                                    required:{
                                        value:true,
                                        message:"please Enter Your Contact Number"
                                    },
                                    maxLength:{value:12,message:"Invalid Contact number"},
                                    minLength:{value:10,message:"Invalid Contact Number"}
                                })
                            }        
                            defaultValue={user?.additionalDetails?.contactNumber}
                            >
                            </input>
                            {errors.contactNumber && (
                                <span className="-mt-1 text-[12px] text-black">
                                    {errors.contactNumber.message}
                                </span>
                            )}
                            </div> 
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label className="lable-style">
                                    About
                                </label>
                                <input
                                type="text"
                                name="about"
                                placeholder="Enter Your Details"
                                {...register("about",{required:true})}
                                defaultValue={user?.additionalDetails?.about}
                                >
                                </input>
                                {errors.about && (
                                <span className="-mt-1 text-[12px] text-black">
                                    Please enter your About.
                                </span>
                                )}
                            </div>        
                        </div>
                    </div>
                     <div className="flex justify-end gap-2">
                        <button
                        onClick={()=>{
                            navigate("/dashboard/my-profile")
                        }}
                        className="cursor-pointer rounded-md bg-black text-white py-2 px-5 font-semibold "
                        >
                           Cancel     
                        </button>
                        <button type="submit" className="cursor-pointer rounded-md bg-black text-white py-2 px-5 font-semibold" >
                            Save
                        </button>
                    </div>               


                </form>
            </div>
            <UpdatePassword></UpdatePassword>
            <div>
                <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-black bg-black text-white p-8 px-12">
                   <div className="flex flex-col space-y-2">
                        <h2 className="text-lg font-semibold text-white">
                            Delete Account
                        </h2>
                        <div className="w-3/5 text-white">
                            <p>Would You Like To Delete Your Account? </p>
                            <p>
                            This account may contain Paid Courses. Deleting your account is
                            permanent and will remove all the contain associated with it.
                            </p>
                        </div>
                        <button
                        type="button"
                        className="w-fit cursor-pointer italic bg-white text-black"
                        onClick={handleDeleteAccount}
                        >
                            I want to Delete My Account
                        </button>
                   </div>
                </div>

            </div>            
       </div>
    )
}
export default Settings;
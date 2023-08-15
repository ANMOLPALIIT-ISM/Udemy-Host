import React from "react";
import { useEffect } from "react";
import {useForm} from "react-hook-form"
import countryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
const Contact=()=>{
    const submitContactForm=async(data)=>{
         try{
            const res=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
         }  catch(err){
            console.log(err);
         } 
    }
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:""
            })
        }
    },[reset,isSubmitSuccessful])
    return (<form onSubmit={handleSubmit(submitContactForm)}>
        <div className="flex flex-row gap-x-5 gap-y-5">
            <label className="flex flex-col text-semibold p-[10px]">
                First Name
                <input type={"text"} name="firstname" placeholder="Enter Your firstname"
                {...register("firstname",{required:true})}
                />
                {
                    errors.fistName && (<span>
                        Please Enter your First Name
                    </span>)
                }
            </label>
            <label className="flex flex-col p-[10px]">
                Last Name
                <input type={"text"} name="lastname" placeholder="lastName"
                {...register("lastname",{required:true})}
                />
                {
                    errors.lastName &&(
                        <span>
                            Please Enter your Last Name
                        </span>
                    )
                }
            </label>
        </div>
        <div>
             <label className="flex flex-col p-[10px]">
                Enter Your Email    
                <input
                type={"email"}
                placeholder="Enter your Email"
                name="email"
                {...register("email",{required:true})}
                ></input>
                {
                    errors.email && (<span>
                        Enter Your Email
                    </span>)
                }    
                
                
                
            </label>   
         </div>  
         <div className="flex flex-col">
         <label className="p-[5px]">Phone Number</label>
         <div className="flex flex-row">
            <div>
                <select name="dropdown"
                className="bg-black text-white w-[120px] " 
                {...register("countrycode",{required:true})}

                >
                    {
                        countryCode.map((elem,index)=>{
                            return (
                                <option key={index} value={elem.code} >
                                      {elem.code}-{elem.country}  
                                </option>
                            );
                        })
                    }
                </select>
            </div>
            <div>
                    <input type={"number"} 
                    name="phonenumber"
                    placeholder="12345 67890"
                    {...register("phoneNo",{
                        required:{value:true,message:"please Enter your phone number"},
                        maxLength:{value:10,message:"Please Enter a valid number"},
                        minLength:{value:10,message:"Please Enter a valid number"}
                    })}
                    >
                    </input>
                    {errors.phoneNo &&(<span>{errors.phoneNo.message}</span>)}
            </div>
        </div>
         </div>
         <div>
            <label className="flex flex-col p-[10px]">
                Message:
                <textarea
                name="message"
                cols="30"
                rows={"7"}
                placeholder="Enter your message here"
                {...register("message",{required:true})}
                />
                {
                    errors.message && (
                        <span>
                            Enter your message
                        </span>
                    )
                }

            </label>
          </div>
          <div>
            <button type="submit" className="rounded-md bg-black text-center text-white px-6 text-[16px] font-bold mt-[12px]">SUBMIT</button>
            </div>   
    </form>
    );
}
export default Contact;
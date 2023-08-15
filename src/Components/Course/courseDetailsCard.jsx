import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import copy from "copy-to-clipboard"
import { addToCart } from "../../slices/cartSlice";

const CourseDetailsCard=({course,handleBuyCourse})=>{
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();

    const {
        thumbnail,
        price,

    }=course;
    const handleAddToCart=()=>{
        if(user && user?.accountType==='Instructor'){
            toast.error("You are an Instructor, You can't Buy a Course")
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }
        toast.error("You are Not logged In");
        navigate("/login");

    }
    const handleShare=()=>{
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    }
    return (
        <div className={`flex flex-col gap-4 rounded-md bg-black p-4 text-white`}>
            <img src={thumbnail} className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full'/>
            <div className="px-4">
            <div className="space-x-3 pb-4 text-3xl font-semibold">
                Rs. {price}
            </div>
            <div className="flex flex-col gap-4">
                <button onClick={
                    user&&course?.studentsEnrolled.includes(user?._id)?()=>navigate("/dashboard/enrolled-courses"):handleBuyCourse
                }>
                    {
                        user && course?.studentsEnrolled.includes(user?._id) ?"Go To Course":"Buy Now"
                    }
                </button>
                {
                    (!course?.studentsEnrolled.includes(user?._id))&&(
                        <button onClick={handleAddToCart}>
                            Add To Cart
                        </button>
                    )
                }
            </div>
            <div>
                <p className="pb-3 pt-6 text-center text-sm text-white">
                    30 day Money Back Guarantee
                </p>
                <p className="my-2 text-xl font-semibold ">
                    This Course Includes
                </p>
                <div className="flex flex-col gap-3 text-sm">
                    {
                        course?.instructions?.map((item,index)=>{
                            return (
                                <p key={index} className="flex gap-2">
                                    <span>{item}</span>
                                </p>
                            )
                        })
                    }    
                </div>
            </div>
            <div className="text-center">
                <button onClick={handleShare} className='mx-auto flex items-center gap-2 p-6'>
                    Share
                </button>
            </div>
            </div>
        </div>
    );
}
export default CourseDetailsCard;
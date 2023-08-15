import React from "react"
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../slices/cartSlice";
import { useSelector } from "react-redux";
import { buyCourse } from "../../services/operations/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component"
export default function Cart(){
        const {token}=useSelector((state)=>state.auth);
        const {user}=useSelector((state)=>state.profile);
       const {total,totalItems,cart}=useSelector((state)=>state.cart);   
        const dispatch=useDispatch();
        const navigate=useNavigate();
        const handleBuyCourse=()=>{
            const course=cart.map((course)=>course._id);
            buyCourse(course,token,user,navigate,dispatch);
        }
       return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-black">Your Cart</h1>
            <p className="border-b border-b-black pb-2 font-semibold text-black">{totalItems} Courses in your Cart</p>
            {
                total>0?(
                    <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                        <div className="flex flex-1 flex-col">

                        {
                            cart.map((course,index)=>{
                                return (
                                    <div key={course._id} className='flex w-full flex-wrap items-start justify-between gap-6' >
                                        <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                                            <img src={course?.thumbnail} className="h-[148px] w-[220px] rounded-lg object-cover"/>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-lg font-medium text-black">{course?.courseName}</p>
                                                <p className="text-sm text-black">{course?.category?.name}</p>
                                                <div className="flex items-center gap-2">
                                                    {/* <span>4.8</span> */}
                                                    <ReactStars
                                                    count={5}
                                                    value={course?.ratingAndReviews?.length}
                                                    size={20}
                                                    edit={false}
                                                    activeColor="#ffd700"
                                                    emptyIcon={<GiNinjaStar/>}
                                                    fullIcon={<GiNinjaStar/>}
                                                    />
                                                    <span className="text-black">
                                                        {course?.ratingAndReviews?.length} Ratings
                                                    </span>
                                                </div>   
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end space-y-2">
                                            <button onClick={()=>{
                                                dispatch(removeFromCart(course._id))
                                            }}>
                                                <RiDeleteBin6Line>Remove</RiDeleteBin6Line>

                                            </button>
                                            <p className="mb-6 text-3xl font-medium text-black">Rs {course?.price}</p>
                                         </div>   
                                     </div>   
                                );
                            })
                            

                        }
                        </div>
                        <div className="min-w-[280px] rounded-md border-[1px] border-white bg-black p-6">
                            <p className="mb-1 text-sm font-medium text-white">Total:</p>
                            <p className="mb-6 text-3xl font-medium text-white">Rs {total}</p>
                            <button onClick={handleBuyCourse} className='text-center text-[13px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 border-2 text-white'>
                                Buy Now
                            </button>
                        </div>
                     </div>   
                ):(<p className="mt-14 text-center text-3xl text-black">Your Cart is Empty</p>)
            }

        </div>
      )  


}
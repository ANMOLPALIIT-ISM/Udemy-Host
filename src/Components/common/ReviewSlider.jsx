import React ,{useEffect,useState} from "react";
import {Swiper,SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
import {Autoplay,FreeMode,Pagination} from "swiper/modules"
import ReactStars from "react-rating-stars-component"
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";
import { FaStar } from "react-icons/fa";
const ReviewSlider=()=>{
    const [reviews,setReviews]=useState([]);
    useEffect(()=>{
        const fetchAllReviews=async()=>{
            const response=await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
            if(response?.data?.success){
                setReviews(response?.data?.data);
            }

        }
        fetchAllReviews();
    },[]);

    return (<div className="text-white">
            <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
                <Swiper
                slidesPerView={4}
                spaceBetween={25}
                loop={true}
                freeMode={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[FreeMode,Pagination,Autoplay]}
                className='w-full'
                >   
                    {
                        reviews.map((review,index)=>{
                            return (
                                <SwiperSlide key={index} >
                                   <div className="flex flex-col gap-3 bg-black p-3 text-[14px] text-white">
                                   <div className="flex items-center gap-4">
                                   <img src={review?.user?.image?review?.user?.image:`https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`} 
                                    className='h-9 w-9 object-cover rounded-full'
                                    />
                                    <div className="flex flex-col">
                                    <h1 className="font-semibold text-white">
                                        {review?.user?.firstName} {review?.user?.lastName}
                                    </h1>
                                    <h1 className="text-[12px] font-medium text-white">{review?.course?.courseName}</h1>
                                    </div>
                                    </div>
                                    <p className="font-medium text-white">
                                        {review?.review}
                                    </p>
                                    <div className="flex items-center gap-2 ">
                                    <h3 className="font-semibold text-yellow">
                                        {review?.rating.toFixed(1)}
                                    </h3>
                                    <ReactStars count={5} value={review.rating} size={20} edit={false} activeColor={"#ffd700"} emptyIcon={<FaStar></FaStar>} fullIcon={<FaStar></FaStar>}>

                                    </ReactStars>
                                    </div>
                                   </div>
                                </SwiperSlide>
                            );
                        })
                    }
                </Swiper>
            </div>
    </div>)
}
export default ReviewSlider;
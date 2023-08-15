import React from "react";
import {Swiper,SwiperSlide} from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {FreeMode,Pagination} from "swiper/modules"
import Course_Card from "./CourseCard";

const CourseSlider=({Courses})=>{
    return (
        <div>
            {
                Courses?.length>0?(
                    <Swiper slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    modules={[FreeMode, Pagination]}
                    breakpoints={{
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                    className="max-h-[30rem]">    
                        {
                            Courses?.map((course,index)=>{
                                return (
                                <SwiperSlide key={index}>
                                    <Course_Card course={course} Height={"h-[250px]"}></Course_Card>
                                </SwiperSlide>)
                            })
                        }
                     </Swiper>   
               ):(
                    <p className="text-xl text-black">No Course Found</p>
                )
            }
        </div>
    )
}
export default CourseSlider;
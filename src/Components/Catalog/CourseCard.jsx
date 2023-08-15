import React, { useEffect } from "react";
import GetAvgRating from "../../utils/avgRating";
import RatingStars from "../common/RatingStar"
import {Link} from "react-router-dom"
import { useState } from "react";
const Course_Card=({course,Height})=>{
    const [avgReviewCount,setAvgReviewCount]=useState(0);
    useEffect(()=>{
        const count=GetAvgRating(course?.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])
    return (
        <div>
            <Link to={`/courses/${course._id}`}>
                <div>
                    <div className="rounded-lg">
                        <img src={course?.thumbnail} className={`${Height} w-full rounded-xl object-cover`}/>
                    </div>
                    <div className="flex flex-col gap-2 px-1 py-3">
                        <p className="text-xl text-black">{course?.courseName}</p>
                        <p className="text-sm text-black">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow">{ avgReviewCount||0}</span>
                            <RatingStars Review_Count={avgReviewCount}/>
                            <span className="text-black">{course?.ratingAndReview?.length} Ratings</span>
                        </div>
                        <p className="text-xl text-black">Rs. {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
export default Course_Card;
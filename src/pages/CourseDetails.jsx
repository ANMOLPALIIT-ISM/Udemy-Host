import React, { useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import {buyCourse} from "../services/operations/studentFeaturesAPI"
import { useNavigate,useParams } from "react-router-dom";
import {fetchCourseDetails} from "../services/operations/courseDetailsAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"
import { toast } from "react-hot-toast";
import RatingStars from "../Components/common/RatingStar"
import CourseDetailsCard from "../Components/Course/courseDetailsCard";
import { useState } from "react";
import {HiOutlineGlobeAlt} from "react-icons/hi"
import CourseAccordionBar from "../Components/Course/courseAccordionBar";
const CourseDetails=()=>{
    // const navigate=useNavigate();
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {courseId}=useParams();
    const [courseData,setCourseData]=useState(null);
    const [isactive,setIsActive]=useState([]);
    useEffect(()=>{
        const getCourseFullDetails=async()=>{
            try{
                const result= await fetchCourseDetails(courseId);
                setCourseData(result);     
            }
            catch(err){
                console.log(err);

            }
        }
        getCourseFullDetails();
    },[courseId]);
    const [avgReviewCount,setAvgReviewCount]=useState(0);
    useEffect(()=>{
        const count=GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAvgReviewCount(count);
    },[courseData]);
    const [totalNoOfLectures,setTotalNoOfLectures]=useState(0);
    useEffect(()=>{
        let lectures=0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec)=>{
            lectures+=sec.subSection.length||0;
        })
        setTotalNoOfLectures(lectures);
    },[courseData])
    if(!courseData){
        return (
            <div>
                Please Wait
            </div>
        )
    }
    if(!courseData.success){
        return (    
            <div>
                <Error></Error>
            </div>
        )
    }
    const handleBuyCourse=()=>{
        if(token){
            buyCourse([courseId],token,user,navigate,dispatch);  
            return;
        }
        else{
            toast.error("You are not logged in");
            navigate("/login");
        }
    }
    const {
        _id:course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,

    }=courseData.data?.courseDetails;
    
    const handleActive=(id)=>{
        setIsActive(
            !isactive.includes(id)?
            isactive.concat(id):
            isactive.filer((e)=>e!=id)
        ); 

    }
    return (
        <>
      <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-black`}
            >
              <div>
                <p className="text-4xl font-bold text-black sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`http://localhost:3000/courses/64d7890bcdd913484fe77d49text-black`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-black py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-black">
                Rs. {price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={courseData?.data?.courseDetails}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-black lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-black p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              {whatYouWillLearn}
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{courseData.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isactive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-black">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}
export default CourseDetails;
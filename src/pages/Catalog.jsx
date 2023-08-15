import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/PageAndComponenetData";
import CourseSlider from "../Components/Catalog/CourseSlider"
import Course_Card from "../Components/Catalog/CourseCard";
import { toast } from "react-hot-toast";
const Catalog=()=>{
    const [active,setActive]=useState(1);
    const {catalogName}=useParams();
    const [catalogPageData,setCatalogPageData]=useState(null);
    const [categoryId,setCategoryId]=useState("");
    useEffect(()=>{
        // console.log(catalogName)
        const getCategoryDetails=async()=>{
            const res=await apiConnector("GET",categories.CATEGORIES_API);
            const categoryId=res?.data?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()===catalogName)[0]._id;
            setCategoryId(categoryId);

        }
        getCategoryDetails();
    },[catalogName]);
    useEffect(()=>{
        const getCategoryD=async()=>{
            try{
                const res=await getCatalogPageData(categoryId);
                console.log("focus",res);
                setCatalogPageData(res);
            }   
            catch(err){
                toast.error("Internal Server Error")
            }
        }
        if(categoryId){
            getCategoryD();

        }
    },[categoryId])
    return (
        <>
        <div className="box-content px-4 bg-black text-white">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
                <p className="text-sm">{`Home/Catalog/`}
                <span>
                    {catalogPageData?.selectedCategory?.name}
                </span>
                </p>
                <p className="text-3xl text-white">{catalogPageData?.selectedCategory?.name}</p>
                <p className="max-w-[870px] text-white">{catalogPageData?.selectedCategory?.description}</p>
            </div>
            </div>
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                
                    <div className="section_heading">Courses to get you started</div>
                    <div className="my-4 flex border-b border-black text-sm">
                        <p
                        className={`px-4 py-2 ${
                            active === 1
                              ? "border-b border-b-yellow bg-black text-white"
                              : "text-black bg-white"
                          } cursor-pointer`}
                          onClick={()=>setActive(1)}
                        >Most Popular</p>
                        <p
                        className={`px-4 py-2 ${
                            active === 2
                              ? "border-b border-b-yellow bg-black text-white"
                              : "text-black bg-white"
                          } cursor-pointer`}
                          onClick={()=>setActive(2)}
                        >New</p>
                    </div>
                    <CourseSlider Courses={catalogPageData?.selectedCategory?.courses}></CourseSlider>
                <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <p className="section_heading">
                        Top Courses in Other Categories</p>
                    <div className="py-8">
                        <CourseSlider Courses={catalogPageData?.differentCategories}></CourseSlider>
                    </div>

                </div>
                <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <p className="secton_heading">Frequently Bought</p>
                    <div className="py-8">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {
                                catalogPageData?.mostSellingCourses.slice(0,4)
                                .map((course,index)=>{
                                    
                                    return <Course_Card course={course} key={index} Height={"h-[250px]"}></Course_Card>
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        </> 
    )
}
export default Catalog;
const Subsection=require("../models/SubSection");
const CourseProgress=require("../models/CourseProgress")
exports.updateCourseProgress=async(req,res)=>{
    const {courseId,subSectionId}=req.body;
    const userId=req.user.id;
    try{
        const subSection=await Subsection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                error:"Invalid Subsection"
            })
        }
        let courseProgress=await CourseProgress.findOne({courseId:courseId,userId:userId});
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            })
        }
        else{
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    success:false,
                    message:"SubSection already marked Completed"
                })
            }
            courseProgress.completedVideos.push(subSectionId);
            
        }
        await courseProgress.save();
        return res.status(200).json({

            success:true,
            message:"Course Progress added Successfully"
            }
        )
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }




}
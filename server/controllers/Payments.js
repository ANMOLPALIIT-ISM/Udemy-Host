const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const crypto=require("crypto");
const CourseProgress = require("../models/CourseProgress");


exports.capturePayment=async(req,res)=>{
    const {courses}=req.body;
    const userId=req.user.id;
    if(courses.length===0){
        return res.json({
            success:false,
            message:"Please Provide Course Id"
        })
    } 
    let totalAmount=0;
     for(const course_id of courses){
        let course;
        try{
            course=await Course.findById(course_id);
            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"Could Not find the course"
                })
            }
            const uid=new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already Enrolled"
                })
            }
            totalAmount+=course.price;
        }catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }   
     }   
     const options={
        amount:totalAmount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString()
     }
     try{
        const paymentResponse=await instance.orders.create(options);
        return res.json({success:true,data:paymentResponse});
     }
     catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Could Not Initiate Order"
        })
     }

}
exports.verifyPayment=async(req,res)=>{
    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id
    const razorpay_signature=req.body?.razorpay_signature;
    const courses=req.body?.courses;
    const userId=req.user.id;

    if(!razorpay_order_id||!razorpay_payment_id||!razorpay_signature||!courses||!userId){
        return res.status(200).json({
            success:false,
            message:"Payment has Failed"
        })
    }  
    let body=razorpay_order_id+'|'+razorpay_payment_id;
    const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");
    if(expectedSignature===razorpay_signature){
        await enrolledStudents(courses,userId,res);
        return res.status(200).json({
            success:true,
            message:"Payment Verified"
        })
    }
    return res.status(200).json({
        success:false,
        message:"Payment Failed"
    })



}
exports.sendPaymentSuccessEmail=async(req,res)=>{
    console.log("this is the the req",req);
    const {orderId,paymentId,amount}=req.body;
    const userId=req.user.id;
    if(!orderId||!paymentId||!amount||!userId){
        return res.status(400).json({
            success:false,
            message:"Please provide all the fields"
        })
    }
    try{
        const enrolledStudent=await User.findById(userId);
        await mailSender(enrolledStudent.email,`Payment Received`,this.sendPaymentSuccessEmail(`${enrolledStudent.email}`,amount/100,orderId,paymentId));

    }
    catch(err){
        console.log("Error in Sending Mail",err);
        return res.status(500).json({
            success:false,
            message:"Could not send Email"
        })
    }


}
const enrolledStudents=async(courses,userId,res)=>{
    try{
        if(!courses||!userId){
            return res.status(400).json({
                success:false,
                message:"Please provide Data for Courses of userId"
            })
        }
        for(const courseId of courses){
            const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course Not Found"
                })
            }
            const courseProgress=await CourseProgress.create({
                courseId:courseId,
                userId:userId,
                completedVideos:[]
            })
            const enrolledStudent=await User.findByIdAndUpdate({_id:userId},{$push:{courses:courseId,courseProgress:courseProgress._id}},{new:true})
            const emailResponse=await mailSender(enrolledStudent.email,`Successfully Enrolled into ${enrolledCourse.courseName}`,courseEnrollmentEmail(enrolledCourse.courseName,enrolledStudent.firstName))
            // console.log("Email Sent Successfully",emailResponse);
            
        }
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}



exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];

    const shasum =  crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest) {
        console.log("Payment is Authorised");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{
                
                const enrolledCourse = await Course.findOneAndUpdate(
                                                {_id: courseId},
                                                {$push:{studentsEnrolled: userId}},
                                                {new:true},
                );

                if(!enrolledCourse) {
                    return res.status(500).json({
                        success:false,
                        message:'Course not Found',
                    });
                }

                console.log(enrolledCourse);

                
                const enrolledStudent = await User.findOneAndUpdate(
                                                {_id:userId},
                                                {$push:{courses:courseId}},
                                                {new:true},
                );

                console.log(enrolledStudent);

                
                const emailResponse = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulations from UDEMY",
                                        "Congratulations, you are onboarded into new UDEMY Course",
                );

                console.log(emailResponse);
                return res.status(200).json({
                    success:true,
                    message:"Signature Verified and COurse Added",
                });


        }       
        catch(error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    else {
        return res.status(400).json({
            success:false,
            message:'Invalid request',
        });
    }


};
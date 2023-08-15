const {contactUsEmail} =require("../mail/templates/ContactUsEmail")
const mailSender=require("../utils/mailSender")

exports.contactUsController=async(req,res)=>{
    const {email,firstname,lastname,message,phoneNo,countrycode}=req.body;

    try{
        const emailRes=await mailSender(email,"Your Data is send Successfully",contactUsEmail(email,firstname,lastname,message,phoneNo,countrycode));
        return res.json({
            success:true,
            message:"Email Send Successfully"
        })     


    }catch(err){
        return res.json({
            success:false,
            message:"Something went wrong..."
        })
    }


}
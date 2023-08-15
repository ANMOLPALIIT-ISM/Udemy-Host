import { apiConnector } from "../apiconnector";
import {studentEndpoints} from "../apis"
import { toast } from "react-hot-toast";
import rzpLogo from "../../assets/Logo/Razorpay_logo.svg"
import { resetCart } from "../../slices/cartSlice";
const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints;

function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src;
        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}
export async function buyCourse(courses,token,userDetails,navigate,dispatch){
    try{
        const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }
        const orderResponse=await apiConnector("POST",COURSE_PAYMENT_API,{courses},{Authorization:`Bearer${token}`});
        // console.log()
        if(!orderResponse){
            throw new Error(orderResponse?.data?.message);
        }
        const options={
            key:"rzp_test_AiAId0w5X0ULql",
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"UdemyClone",
            description:"Thank you for purchasing the Course",    
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler:function(response){
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token);
                verifyPayment({...response,courses},token,navigate,dispatch)
            }
        }
        const paymentObject=new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed",function(response){
            toast.error("oops,payment failed")
            console.log(response.error);    
        })
    }
    catch(err){
        console.log(err);
        // console.log(process.env.RAZORPAY_KEY);
        console.log("PAYMENT ERROR");
        toast.error("Could Not Make Payments");
    }


}
async function sendPaymentSuccessEmail(response,amount,token){
    try{
        const bodyData={
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount:amount
        };
        const response= await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,bodyData,{
            Authorization:`Bearer${token}`
        })
    }
    catch(err){
            console.log(err);
        }
}
async function verifyPayment(bodyData,token,navigate,dispatch){
    try{
        const response=await apiConnector("POST",COURSE_VERIFY_API,bodyData,{Authorization:`Bearer${token}`})
        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }
        toast.success("payment Successfull ,You are Added in the Course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch(err){
        console.log(err);
        toast.error("Could Not Verify Payment")
    }

}

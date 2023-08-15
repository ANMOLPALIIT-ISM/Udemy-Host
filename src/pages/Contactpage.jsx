import React from "react";
import ContactDetails from "../Components/ContactPage/ContactDetails";
import Contact from "../Components/common/Contact";
import ReviewSlider from "../Components/common/ReviewSlider";
const ContactPage=()=>{
    return (
        <div>
            <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-black lg:flex-row">
            <div >
                <ContactDetails></ContactDetails>
            </div>
            <div className="border-2 p-[20px] rounded-md border-black">
                <Contact></Contact>
            </div>

        </div>
        <div>
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
        </div>
        </div>
        





    );




}
export default ContactPage;
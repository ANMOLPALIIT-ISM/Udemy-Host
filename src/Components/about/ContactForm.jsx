import React from "react";
import Contact from "../common/Contact";
const ContactForm=()=>{
    return (
        <div className="flex flex-col">
            <div>
                <h1>Get In Touch</h1>
            </div>
            <div>
                <p>We'd love to here from you,please fill out this form </p>
            </div>
            <div>
                <Contact></Contact>
            </div>
        </div>
    );

}
export default ContactForm;
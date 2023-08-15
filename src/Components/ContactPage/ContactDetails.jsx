import React from "react";
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"
const contactDetails=[
    {
        icon: "HiChatBubbleLeftRight",
        heading: "Chat on us",
        description: "Our friendly team is here to help.",
        details: "info@udemy.com",
      },
      {
        icon: "BiWorld",
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        details:
          "5th Floor, WeWork, Two Horizon Centre, Golf Course Rd, DLF Phase 5, Sector 43, Gurugram, Haryana 122002 ",
      },
      {
        icon: "IoCall",
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm",
        details: "+123 456 7869",
      },
]
const ContactDetails=()=>{
    return (
        <div className="flex flex-col gap-6 rounded-xl bg-black p-4 lg:p-6">
            {
                contactDetails.map((elem,index)=>{
                   let Icon=Icon1[elem.icon]||Icon2[elem.icon]||Icon3[elem.icon];
                    return (
                        <div className="flex flex-col gap-[2px] p-3 text-sm text-white " key={index}>
                            <div className="flex flex-row items-center gap-3">
                                <Icon></Icon>
                                <h1 className="text-lg font-semibold ">{elem?.heading}</h1>
                            </div>
                            <p className="font-medium">{elem?.description}</p>
                            <p className="font-semibold">{elem?.details}</p>                                    
                        </div>                            
                   );     
                })
            }
        </div>
    );
}  
export default ContactDetails;
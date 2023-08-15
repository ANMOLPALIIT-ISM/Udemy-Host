import React from "react";
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import ContactForm from "../Components/about/ContactForm";
import ReviewSlider from "../Components/common/ReviewSlider";
const About=()=>{
    return (
        <div>
            <section>
                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center">
                    <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
                    Improving lives through learning
                    <p className="mx-auto mt-3 text-center text-base font-medium lg:w-[95%]">
                    Whether you want to learn or to share what you know, you’ve come to the right place. As a global destination for online learning, we empower organizations and individuals with flexible and effective skill development. 
                    </p>
                    </header>
                    <div className="sm:h-[70px] lg:h-[150px]"></div>
                    <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
                        <img src={BannerImage1}></img>
                        <img src={BannerImage2}></img>
                        <img src={BannerImage3}></img>
                    </div>
                </div>
            </section>

            <section className="mt-[100px]">
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10">
                    <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
                        <div className="my-24 flex lg:w-[50%] flex-col gap-10">

                        <h1 className="text-4xl font-bold">Our Founding Story</h1>
                        <p className="text-base font-medium lg:w-[95%]">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className="text-base font-medium lg:w-[95%]">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    
                        </div>
                    <div>
                        <img src={FoundingStory}></img>
                    </div>
                    </div>
                    <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
                    <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                        <h1 className="text-4xl font-bold">
                            Our Vision
                        </h1>
                        <p className="text-base font-medium lg:w-[95%]">
                            With this vision in mind, we set out on a journey to create an e-learning 
                            platform that would revolutionize the way people learn. Our team of dedicated 
                            experts worked tirelessly to develop a robust and intuitive platform that combines 
                            cutting-edge technology with engaging content ,fostering a dynamic and interactive 
                            learning experience 
                        </p>
                    </div>
                    <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                        <h1 className="text-4xl font-bold">Our Mission</h1>
                        <p className="text-base font-medium lg:w-[95%]">
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.

                        </p>
                    </div>
                </div>  
                </div>
                

            </section>
            <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col items-center justify-center gap-10">
                <div className="border-2 p-[20px] border-black rounded-md"><ContactForm></ContactForm></div>
            </section>
            <div>
                <h1 className="text-center text-4xl font-semibold mt-8">
                    Reviews from Others
                </h1>
                <ReviewSlider></ReviewSlider>
            </div>
        </div>
    );
}
export default About;
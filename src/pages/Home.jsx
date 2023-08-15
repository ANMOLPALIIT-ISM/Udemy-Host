import React from "react"
import {FaArrowRight} from "react-icons/fa"
import  {Link}  from "react-router-dom";
import Abutton from "../Components/homepage/Abutton";
import Frontvideo from "../assets/Images/banner.mp4"
import Codeblock from "../Components/homepage/Codeblock";
import image from "../assets/Images/FoundingStory.png";
import logo1 from "../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../assets/Images/TimelineImage.png" 
import kyprogress from "../assets/Images/Know_your_progress.png"
import pylesson from "../assets/Images/Plan_your_lessons.png"
import cwothers from "../assets/Images/Compare_with_others.png"
import instructor from "../assets/Images/Instructor.png"
import ReviewSlider from "../Components/common/ReviewSlider";
const timeline=[
    {
        logo:logo1,
        heading:"Leadership",
        desciption:"Fully committed to the success of a company"
    },
    {
        logo:logo2,
        heading:"Responsibilty",
        desciption:"students will always be our top priority"
    },{
        logo:logo3,
        heading:"Flexibility",
        desciption:"The ability to switch is an important skill"
    },{
        logo:logo4,
        heading:"Solve the Problem",
        desciption:"Code your way to the solution"
    }
]
const Home=()=>
{
    return (
        <div >
            <div className="mt-16 p-1 relative mx-auto flex flex-col w-11/12 items-center text-black justify-between">
                <Link to={"/signup"}>
                    <div className="mx-auto rounded-full bg-richblack font-bold text-black transition-all duration-200
                    hover:scale-95  border-2">
                        <div className="flex flex-row items-center p-1 gap-rounded-full px-10 py-[10px] my-[10px]">
                            <p>Become an Instructor</p>
                            <FaArrowRight/>            
                        </div>

                    </div>
                </Link>
                <br></br>
                <div className="text-center text-4xl font-semibold">
                    <h1>Develop your skills</h1>
                </div>
                <br></br>
                <div className="w-[90%] text-center text-2xl font-bold mt-4">
                Learn in-demand programming languages like Python, Java, C++, and more. Find the course for you.
                </div>
                <div className="flex flex-row gap-7 mt-8">
                    <Abutton linkto={"/signup"}>Learn More</Abutton>
                    <Abutton linkto={"/login"}>Book demo</Abutton>
                </div>
                <div className="mx-3 my-12 h-[600px] w-[1200px] shadow-blue-200">
                    <video muted loop autoPlay>
                        <source src={Frontvideo} type="video/mp4"></source>
                    </video>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div>
                <Codeblock position="lg:flex-col" heading="Unlock Your coding potential With Our Courses" 
                subheading="Our courses are taught by industry experts who have years of experience in coding 
                and are passionate about sharing their knowledge with you" linkel1="/signup" btntext1={"try it yourself"}
                linkel2="/login" btntext2={"learn more"} imglink={image}></Codeblock>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="mx-auto w-11/12 maxContent flex flex-col items-center justify-between gap-7">
                    <div className="flex flex-row gap-5">
                        <div className="text-4xl font-semibold w-[40%]">
                            Get the skills you need for a JOB in demand 
                        </div>
                        <div className="flex flex-col gap-10 w-[40%]">
                            <div className="text-[16px]">
                               Udemy allows you to be more than a learner, it makes you an expert by including sufficient practice assignments within the courses that are offered

                            </div>
                            <Abutton linkto={"/signup"}>Learn More</Abutton>
                        </div>    
                    </div>
                    <br></br>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="flex flex-row gap-15 items-center">
                    <div className="w-[45%] flex flex-col gap-5">
                            {
                                timeline.map((element,index)=>{
                                    return (
                                        <div className="flex flex-row gap-6" key={index}> 
                                              <div className="w-[50px] h-[50px] bg-white flex items-center ">
                                                <img src={element.logo}></img>  
                                               </div>   
                                               <div>
                                                <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                                                <p className="text-base">{element.desciption}</p>
                                                </div>

                                        </div>
                                    );
                                })
                            }
                    </div>
                    <div className="relative shadow-blue-200">
                        <img src={timelineImage}/>
                     </div>   
                    </div> 
                    <br />
                    <br />
                    <br />
                    <br />                          
                    <div className="flex flex-col gap-5 ">
                        <div className="text-4xl font-semibold text-center ">
                            Your Swiss Knife Learning any Language
                        </div>
                        <div className="text-center mx-auto text-base mt-3 font-medium">
                            With over 20+ laguages realistic voice-over,progress tracking,custom schedule courses , you can become proficient any computer language within no time   
                        </div>
                        <div className="flex flex-row items-center justify-center mt-5">
                            <img src={kyprogress} className="mr-0"/>
                            <img src={cwothers} className="ml-0"></img>
                            <img src={pylesson} className="ml-0"></img>
                        </div>
                    </div>


                </div> 
                
            </div>    
            <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8">
                  <div className="mt-20 items-center">
                    
                <div className="flex flex-row gap-20 items-center ">
                      <div className="w-[40%]">
                          <img src={instructor}/>      
                      </div>
                      <div className="w-[50%] flex flex-col gap-10">
                          <div className="text-4xl font-semibold">
                            BECOME an INSTRUCTOR
                            </div>      
                            <p className="font-medium text-2xl w-[90%] ">
                                Instructor from around the world teach millions of students on Udemy. We provide the tools 
                                and skills to teach what you love.
                            </p>
                            <div className="w-fit">
                            <Abutton linkto={"/signup"}>Start Teaching Today</Abutton>

                            </div>
                    </div>          
                    
                </div>
                </div>              

                 <br/>
                 <br/>
                 <br/>
                 <br/>           
                <h2 className="text-center text-4xl font-semibold mt-10">Review From Others </h2>
                <ReviewSlider></ReviewSlider>
            </div>                         





        </div>
    );
}
export default Home
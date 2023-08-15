import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Udemylogo from "../../assets/Logo/Udemy_logo.svg.png"
import { NavbarLinks } from "../../data/navbar-links";
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from "../auth/profileDropDown"
import { apiconnector } from "../../services/apiconnector";
import { categories } from "../../services/apis"; 
import { useEffect } from "react";
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { apiConnector } from "../../services/apiconnector";
const Navbar=()=>{
    const {token}=useSelector((state)=>state.auth);
    const{user}=useSelector((state)=>state.profile);
    const{totalItems}=useSelector((state)=>state.cart)
    const [subLinks,setSubLinks]=useState([]);
    const fetchLinks=async()=>{
        try{
            const result =await apiConnector("GET",categories.CATEGORIES_API);
            
            setSubLinks(result.data.data)
        }
        catch(err){
            console.log("could not fetch the category list ")
        }
    }
    useEffect(()=>{
        fetchLinks();
    },[])
    return (
        <div className="flex h-14 items-center justify-center border-b-[1px]">
            <div className="flex w-11/12 max-w-maxContent items-center justify-between">
                <Link to="/">
                    <img src={Udemylogo} width="160" height="42" ></img>
                </Link>
            
            <nav>
                <ul className="flex gap-x-6">
                      {
                        NavbarLinks.map((link,index)=>{
                            return(
                                <li key={index}>
                                {
                                    link.title==="Catalog"?(
                                    <div className="relative flex items-center gap-2 group">
                                           <p>{link.title}</p> 
                                           <IoIosArrowDropdownCircle></IoIosArrowDropdownCircle>
                                           <div className="invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[15%]
                                 top-[0%]
                                flex flex-col rounded-md bg-black p-4 text-black
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]">
                                              
                                           <div className='absolute left-[50%] top-0
                                                translate-x-[80%]
                                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-black'>
                                            </div>
                                              {
                                                subLinks.length?(
                                                        subLinks.map((element,id)=>{
                                                            return (
                                                                <Link to={`/catalog/${element.name
                                                                    .split(" ")
                                                                    .join("-")
                                                                    .toLowerCase()}`}>
                                                                    <div key={id} className="text-white">
                                                                    {element.name}
                                                                </div>    
                                                                </Link>
                                                                
                                                            );
                                                        })
                                                ):(<div></div>)
                                              }  
                                            </div>
                                    </div>):(<Link to={link?.path}>
                                        <p>{link.title}</p>
                                    </Link>)
                                }
                            </li>
                            );
                                 
                        })
                      }  
                </ul>
            </nav>
            <div className="flex gap-x-4 items-center">
                {
                    user&&user?.accountType!="Instructor"&&(
                        <Link to="/dashboard/cart">
                            <AiOutlineShoppingCart></AiOutlineShoppingCart>
                        </Link>
                    )
                }
                {
                    token===null&& (<Link to="/login">
                        <button className="border border-richblack px-[12px] py-[12px] rounded-md">
                            Log In
                        </button>
                    </Link>)   
                }
                {
                    token===null&&(
                        <Link to="/signup">
                            <button className="border border-richblack px-[12px] py-[12px] rounded-md">
                                Sign-up
                            </button>
                        </Link>
                    )
                }
                {
                    token!==null &&(<ProfileDropDown></ProfileDropDown>)
                }
                {

                }
            </div>

        </div>
        </div>
    );
}
export default Navbar;
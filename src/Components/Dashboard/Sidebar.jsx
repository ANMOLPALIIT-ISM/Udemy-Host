import React from 'react';
import { sidebarLinks } from '../../data/dashboard-links';
import {logout} from "../../services/operations/authAPI"
import * as Icons from "react-icons/vsc"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VscSettingsGear } from 'react-icons/vsc';
import { VscSignOut } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
const Sidebar=()=>{
     const{user}=useSelector((state)=>state.profile)
     const navigate=useNavigate();
     const dispatch=useDispatch();
     const clickHandler=()=>{
        dispatch(logout(navigate));
     }
    return (
        <div>
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-black h-[calc(100vh-3.5rem)] bg-black py-10'>
                <div className='flex flex-col '>
                    {
                        sidebarLinks.map((elem,index)=>{
                            const Icon=Icons[elem.icon];
                            console.log(elem.type);
                            if(elem.type && user?.accountType!==elem.type){
                                return null;    
                            }
                            return (
                                <Link to={elem.path} className="text-white px-8 py-2 text-semibold font-medium" key={index}>
                                    <div className='flex items-center gap-x-2' key={index}>
                                    <Icon></Icon>
                                    <span>{elem.name}</span>
                                    </div> 
                                </Link>
                            );
                        })
                    }
                </div>
                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-white'></div>
                <div className='flex flex-col text-white font-medium text-semibold px-8 py-2 '>
                            <Link to="dashboard/settings" className="flex items-center gap-x-2">
                             <VscSettingsGear></VscSettingsGear>
                            <span>Settings</span>
                            </Link>
                            <button className='flex items-center gap-x-2 mt-[10px]  ' onClick={clickHandler}>
                            <VscSignOut></VscSignOut>
                            <span>Logout</span>
                            </button>
                </div>   
            </div>         
        </div>
    );
}
export default Sidebar;
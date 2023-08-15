import React from "react";
import { useState,useRef } from "react";
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { logout } from "../../services/operations/authAPI";
const ProfileDropDown=()=>{
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useOnClickOutside(ref, () => setOpen(false))
    return (
        <button className="relative" onClick={()=>setOpen(true)}>
            <div className="flex items-center gap-x-1">
                <img src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[30px] rounded-full object-cover"
                ></img>
            </div>
            {
                open && (
                    <div ref={ref} className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-black bg-white">
                        <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                        <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-black hover:bg-black hover:text-white">
                        <VscDashboard className="text-lg" />
                        Dashboard
                        </div>
                        </Link>
                        <div
                        onClick={() => {
                        dispatch(logout(navigate))
                        setOpen(false)
                        }}
                            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                        >
                        <VscSignOut className="text-lg" />
                        Logout    
                        </div>
                    </div>
                )
            }

        </button>
    );
}
export default ProfileDropDown
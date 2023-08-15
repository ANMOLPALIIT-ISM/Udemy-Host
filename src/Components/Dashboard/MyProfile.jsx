import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyProfile=()=>{
    const {user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-black">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-black p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm">{user?.email}</p>
          </div>
        </div>
        <button className='mt-6 rounded-[8px] py-[8px] px-[12px] font-medium border-2' onClick={()=>{
            navigate("/dashboard/settings")
        }}>
            Edit
        </button>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-black p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold">About</p>
          <button className='mt-6 rounded-[8px] py-[8px] px-[12px] font-medium border-2' onClick={()=>{
            navigate("/dashboard/settings")
        }}>
            Edit
        </button>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-black"
              : "text-black"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-black p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-black">
            Personal Details
          </p>
          <button className='mt-6 rounded-[8px] py-[8px] px-[12px] font-medium border-2' onClick={()=>{
            navigate("/dashboard/settings")
        }}>
            Edit
        </button>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-black">First Name</p>
              <p className="text-sm font-medium text-black">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-black">Email</p>
              <p className="text-sm font-medium text-black">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-black">Gender</p>
              <p className="text-sm font-medium text-black">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-black">Last Name</p>
              <p className="text-sm font-medium text-black">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-black">Phone Number</p>
              <p className="text-sm font-medium text-black">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-black">Date Of Birth</p>
              <p className="text-sm font-medium text-black">
                {user?.additionalDetails?.dateOfBirth ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>

        </div>
    );
}
export default MyProfile;
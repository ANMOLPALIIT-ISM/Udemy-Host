import React from "react"
import {useState,useEffect} from "react";
import { useSelector } from "react-redux";
const Requirementc=({name,label,register,setValue,errors})=>{
    const {editCourse,course}=useSelector((state)=>state.course);
    const [requirement,setRequirement]=useState("");
    const [requirementList,setRequirementList]=useState([]);
    const handleAddRequirement=()=>{
        if(requirement){
            setRequirementList([...requirementList,requirement]);
            setRequirement("");
        }
    }
    const handleRemoveRequirement=(index)=>{
        const updatedList=[...requirementList];
        updatedList.splice(index,1);
        setRequirementList(updatedList);
    }
    useEffect(()=>{
        setValue(name,requirementList)
    },[requirementList]);

    useEffect(()=>{
        if(editCourse){
            setRequirementList(course?.instructions);
        }
        register(name,{
            required:true,
            validate:(value)=>value.length>0
        })
    },[])
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-black">Add Requirements</label>
                <div className="flex flex-col items-start space-y-2">
                    <input
                    type={"text"}
                    value={requirement} 
                    onChange={(e)=>{setRequirement(e.target.value)}}
                    className='w-full'
                    ></input>
                    <button 
                    type="button"
                    onClick={handleAddRequirement}
                    className='font-semibold text-white bg-black rounded-md p-2'
                    >
                        ADD
                    </button>
                </div>
                {
                    requirementList.length>0 && (
                        <ul className="mt-2 list-inside list-disc">
                            {
                                requirementList.map((elem,index)=>{
                                    return (
                                        <li key={index} className='flex items-center'>
                                            <span>
                                                {elem}
                                            </span>
                                            <button
                                            type="button"
                                            className="ml-2 text-xs bg-black text-white p-1 "
                                            onClick={()=>handleRemoveRequirement(index)}>
                                                Clear
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
                {
                    errors[name] && (<span className="ml-2 text-xs tracking-wide">
                        {label} is missing
                    </span>)
                }
        </div>
    );
}
export default Requirementc;
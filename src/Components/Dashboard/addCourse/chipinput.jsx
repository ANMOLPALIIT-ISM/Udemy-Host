import React from "react";  
import { useEffect ,useState} from "react";
import { useSelector } from "react-redux";
export default function ChipInput({label,name,placeholder,register,errors,setValue,getValue}){
    const{editCourse,course}=useSelector((state)=>state.course);
    const[chips,setChips]=useState([]);
    useEffect(()=>{
        if(editCourse){
            setChips(course?.tag);
        }
        register(name,{required:true})
    },[])
    useEffect(()=>{
        setValue(name,chips)
    },[chips])
    const handleKeyDown=(event)=>{
        if(event.key==='Enter' || event.key===','){
            event.preventDefault();
            const chipValue=event.target.value.trim();
            if(chipValue && !chips.includes(chipValue)){
                const newChips=[...chips,chipValue];
                setChips(newChips);
                event.target.value='';
            }
        }
    }
    const handleDeleteChip=(chipIndex)=>{
            const newchips=[...chips];
            newchips.splice(chipIndex,1);
            setChips(newchips);
    }
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-black">Tags</label>
            <div className="flex w-full flex-wrap gap-y-2">
                {
                    chips.map((chip,index)=>{
                        return (
                            <div key={index} className='m-1 flex items-center rounded-full bg-black text-white text-sm p-2'>   
                                {chip}
                                <button type="button" className="ml-2 focus:otline-none " onClick={()=>handleDeleteChip(index)}>
                                    x
                                </button>
                            </div>
                        )
                    })
                }
                <input
                name={name}
                type='text'
                placeholder={placeholder}
                onKeyDown={handleKeyDown} 
                className='form-style w-full'>
                </input>
            </div>
            {errors[name] && (<span>
                {label} is required
                
                </span>)}
        </div>
    );

}
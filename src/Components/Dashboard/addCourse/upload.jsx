import { useEffect ,useRef,useState} from "react";
import {useDropzone} from "react-dropzone"
import {FiUploadCloud} from "react-icons/fi"
import { useSelector } from "react-redux";
import "video-react/dist/video-react.css"
import {Player} from "video-react"

export default function Upload({
name,label,register,setValue,errors,video=false,viewData=null,editData=null
}){
    const {course}=useSelector((state)=>state.course);
    const [selectedFile,setSelectedFile]=useState(null);
    const[previewSource,setPreviewSouce]=useState(viewData?viewData:editData?editData:"")
    const inputRef=useRef(null);
    const onDrop=(files)=>{
        const file=files[0];
        if(file){
            setSelectedFile(file);
            previewFile(file);
        }
    }
    const {getRootProps,getInputProps,isDragActive}=useDropzone({
        accept:!video?
        {"image/*":[".jpeg",".jpg",".png"]}:{"video/*":[".mp4"]},onDrop
    })
    const previewFile=(file)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setPreviewSouce(reader.result);
        }
    }
    useEffect(()=>{
        setValue(name,selectedFile)
    },[register])
    useEffect(() => {
        setValue(name, selectedFile)
    }, [selectedFile, setValue])

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-xl text-black text-semibold">
                {label}
            </label>
            <div className="flex min-h-[250px] cursor-pointer items-center justify-center rounded-md">
                {
                    previewSource?(
                        <div className="flex w-full flex-col p-6">
                            {!video?(<img src={previewSource} className='h-full w-full rounded-md object-cover'></img>):(<Player aspectRatio="16:9" playsInline src={previewSource}></Player>)}
                            {
                                !viewData && (
                                    <button type="button" onClick={()=>{
                                        setPreviewSouce("")
                                        setSelectedFile(null)
                                        setValue(name,null)
                                    }} className='mt-3 text-black text-bold '>
                                        Cancel
                                    </button>
                                )
                            }
                         </div>   
                    ):(
                        <div className="flex w-full flex-col items-center p-6" {...getRootProps()}>
                            <input {...getInputProps()} ref={inputRef}>
                            </input>    
                            <div className="grid aspect-square w-14 place-items-center rounded-full ">
                                <FiUploadCloud></FiUploadCloud>
                             </div>   
                             <p className="mt-2 max-w-[200px] text-center text-sm text-black text-bold">
                                Drag and Drop an {!video?"image":"video"}, or click to {" "}
                                <span className="font-semibold text-black text-bold">Browse</span> file
                             </p>
                             <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-black text-bold">
                                <li>Aspect ratio 16:9</li>
                                <li>Recommend size 1024x576 </li>
                             </ul>
                        </div>
                        
                    )

                }
                

            </div>
            {
                errors[name] && (<span>
                    {label} is missing
                </span>)
            }
        </div>
    )

}

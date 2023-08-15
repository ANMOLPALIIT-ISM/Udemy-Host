
import React from "react";
import RenderSteps from "./RenderSteps";
export default function AddCourse(){
    return (
        <>
        <div className="flex w-full items-start gap-x-6">
           
           <div className="flex flex-1 flex-col">
            <h1 className="mb-14 text-3xl font-medium text-black">Add Course</h1>
           <div className="flex-1">
            <RenderSteps></RenderSteps>
            </div>
             
        </div>
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-black bg-black p-6 xl:block">
            <p className="mb-8 text-lg text-white">Course Upload Tips</p>
            <ul className="ml-5 list-item list-disc space-y-4 text-xs text-white">
                <li>Set the Course Price option or make it free</li>
                <li>Video Section contains the Course overview video</li>
                <li>Course Builder is where you create and organize a Course</li>
                <li>Add Topics in the Course Builder Section to create lessons,quizzes, and assignments</li>
                <li>information from the Additional Data section shows up an course single page</li>
                <li>Make Annoucements to notify any important notice</li>
            </ul>
        </div>
        </div>
        </>
    );
}
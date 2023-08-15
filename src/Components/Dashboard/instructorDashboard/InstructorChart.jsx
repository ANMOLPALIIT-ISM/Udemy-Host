import React from "react";
import {Chart,registerables} from "chart.js"
import {Pie} from "react-chartjs-2"
import { useState } from "react";
Chart.register(...registerables)

const InstructorChart=({courses})=>{
    const [currChart,setCurrChart]=useState("students");
    const getRandomColors=(numColors)=>{
        const colors=[];
        for(let i=0;i<numColors;i++){
            const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            colors.push(color); 
        }
        return colors;
    }
    const chartDataForStudents={
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalStudentsEnrolled),
                backgroundColor:getRandomColors(courses.length),

            }
        ]
    }
    const chartDataForIncome={
        labels:courses.map((course)=>course.courseName),
        datasets:[{
            data:courses.map((course)=>course.totalAmountGen),
            backgroundColor:getRandomColors(courses.length)
        }]
    }
    const options={
        maintainAspectRatio: false,
    };
    return (
        <div className="flex flex-1 flex-col gap-y-4 rounded-md p-6">
            <p className="text-lg font-bold">Visualize</p>
            <div className="space-x-4 font-semibold">
                <button onClick={()=>setCurrChart("students")}
                className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                    currChart === "students"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                    Student
                </button>
                <button onClick={()=>setCurrChart("income")}
                className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                    currChart === "income"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                    Income
                </button>
            </div>
            <div className="relative mx-auto aspect-square h-full w-full">
            <Pie data={currChart==="students"?chartDataForStudents:chartDataForIncome} options={options}></Pie>
                
            </div>
        </div>
    )
}   
export default InstructorChart;
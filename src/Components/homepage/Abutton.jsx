import React from "react";
import {Link} from "react-router-dom";
const Abutton=({children,linkto})=>{
    return (
        <Link to={linkto}>
            <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 border-2`}>
                {children}
            </div>
        </Link>
    );
}
export default Abutton
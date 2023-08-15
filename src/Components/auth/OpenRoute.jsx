import { useSelector, UseSelector } from "react-redux/es/hooks/useSelector";
import { Navigate } from "react-router-dom";
function OpenRoute({children}){
    const {token}=useSelector((state)=>state.auth)
    if(token==null){
        return children;
    }
    else{
        return <Navigate to={"/dashboard/my-profile"}></Navigate>
    }
}
export default OpenRoute;
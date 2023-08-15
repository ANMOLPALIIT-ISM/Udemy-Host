import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";
export const getCatalogPageData=async(categoryId)=>{
    let result=[];
    try{
        const response= await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId});
        if(!response?.data?.success){
            throw new Error("Could not Fetch Category page Data")
        }
        result=response?.data?.data;    
    }
    catch(err){
        toast.error("Could not Fetch Data")
    }
    return result;
}
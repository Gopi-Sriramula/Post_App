import axios from "axios"

const fetchData2 = function(httpConfig){
    return async (dispatch,getState)=>{
        try{
            const respondse = await axios({
                url:httpConfig.url,
                method:httpConfig.method,
                ...(httpConfig.params && {params:httpConfig.params}),
                ...(httpConfig.data && {data:httpConfig.data}),
                headers:{
                    Authorization:`Bearer :${localStorage.getItem("token")}`,
                }
            })
            return {success:true,data:respondse.data};  
        }
        catch(error){
            return {success:false,data:null}
        } 
    }
}
export default fetchData2;
import axios from "axios"

const fetchData1 = function(httpConfig){
    return async (dispatch,getState)=>{
        try{
            const respondse = await axios({
                url:httpConfig.url,
                method:httpConfig.method,
                data:httpConfig.data,
            })
            return {success:true,data:respondse.data};
        }
        catch(error){
            return {success:false,data:null};
        }
    }
}
export default fetchData1;
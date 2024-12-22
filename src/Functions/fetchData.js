import axios from "axios";
export const fetchData = async function(httpsConfig){
     try{
          const data = await axios({
               url:httpsConfig.url,
               method:httpsConfig.method,
               ...(httpsConfig.data && {data:httpsConfig.data}),
               ...(httpsConfig.params && {params:httpsConfig.params}),
               headers:{
                    Authorization:`Bearer :${localStorage.getItem("token")}`
               }
          })
          return {success:true,data:data}
     }
     catch(error){
          return {success:false,data:null}
     }
}
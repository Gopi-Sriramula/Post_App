import { useEffect } from "react";
import urls, { ApiStatus } from "./urls";
import { useDispatch, useSelector } from "react-redux";
import fetchData2 from "./fetchData2";
import { Spin } from "antd";
import { EachStatusSuggestion } from "./suggesstions";

const Following = function(){
    const dispatch = useDispatch();
    const {apiStatus,data} = useSelector(state=>state.e.following); 
    useEffect(()=>{
        (async function () {
            dispatch({type:"following",payload:{apiStatus:ApiStatus.pending,data:null}});
            const httpConfig = {
                url:urls.followingsList,
                method:"GET",
            }
            const {success,data} = await dispatch(fetchData2(httpConfig));
            if(success){
                dispatch({type:"following",payload:{apiStatus:ApiStatus.success,data:data}})
            }
            else{
                dispatch({type:"following",payload:{apiStatus:ApiStatus.error,data:null}})
            }
        })()
    },[])
    if(apiStatus==="init" || apiStatus===ApiStatus.pending){
        return <div className="spin">
            <Spin size="large"/>
        </div>
    }
    return <div className="connections">
        {
            data.map((item,i)=>{
                return <EachStatusSuggestion item={item} key={i} status="following"/>
            })
        }
    </div>
}
export default Following;
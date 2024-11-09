import { useEffect, useState } from "react";
import urls, { ApiStatus } from "./urls";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spin } from "antd";
import fetchData2 from "./fetchData2";
const Suggesstions = function(){
    const dispatch = useDispatch();
    const {apiStatus,data} = useSelector(state=>state.e.suggesstions);
    useEffect(()=>{
        (async function(){
            dispatch({type:"suggesstions",payload:{apiStatus:ApiStatus.pending,data:null}})
            const httpsConfig = {
                url:urls.suggestionsList,
                method:"GET",
            }
            const {success,data} = await dispatch(fetchData2(httpsConfig));
            if(success){
                dispatch({type:"suggesstions",payload:{apiStatus:ApiStatus.success,data:data.suggestions}})
            }
            else{
                dispatch({type:"suggesstions",payload:{apiStatus:ApiStatus.error,data:null}})
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
            data.map((item)=>{
                return <EachStatusSuggestion item={item} key={item._id} status="suggestions"/>
            })
        }
    </div>
}
export const EachStatusSuggestion = ({item,status})=>{
    const dispatch = useDispatch();
    const [state,setState] = useState({})
    const isFollowing = item.following;
    const onClick = async ()=>{
        setState({...state,[item._id]:1})
        const httpConfig = {
            url:isFollowing?urls.unfollow:urls.follow,
            method:"POST",
            data:{userId:item._id},
        }
        const {success} = await dispatch(fetchData2(httpConfig));
        if(success){
            delete state[item._id];
            setState({...state});
            if(status==="suggestions"){
                dispatch({type:ApiStatus.success,payload:item._id})
            }
            else{
                dispatch({type:"updateFollowing",payload:item._id})
            }
        }
        else{
            delete state[item._id];
            setState({...state});
        }
    }
    return <div className="suggesstions">
        <span>{item.name}</span>
        <Button type="primary" onClick={onClick} loading={state[item._id]}>{isFollowing?"Following":"Follow"}</Button>
    </div>
}
export default Suggesstions;
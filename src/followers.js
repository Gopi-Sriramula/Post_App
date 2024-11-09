import { useEffect, useState } from "react";
import urls, { ApiStatus } from "./urls";
import { useDispatch, useSelector } from "react-redux";
import fetchData2 from "./fetchData2";
import { Button, Spin } from "antd";

const Followers = function(){
    const dispatch = useDispatch();
    const {apiStatus,data}=useSelector(state=>state.e.followers)
    useEffect(()=>{
        (async function () {
            dispatch({type:"followers",payload:{apiStatus:ApiStatus.pending,data:null}})
            const httpConfig = {
                url:urls.followersList,
                methos:"GET",
            }
            const {success,data}=await dispatch(fetchData2(httpConfig));
            if(success){
                dispatch({type:"followers",payload:{apiStatus:ApiStatus.success,data:data}})
            }
            else{
                dispatch({type:"followers",payload:{apiStatus:ApiStatus.error,data:null}})
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
                return <FollowerStatus item={item} key={item._id}/>
            })
        }
    </div>
}
const FollowerStatus = function({item}){
    const {apiStatus} = useSelector(state=>state.e.followers);
    const dispatch = useDispatch()
    const [state,setState] = useState({});
    const onClick = async function(){
        setState({...state,[item._id]:true})
        await new Promise((r)=>{
            setTimeout(()=>{
                r("resolved in 1s")
            },1000)
        })
        delete state[item._id];
        setState({...state});
        dispatch({type:"delete",payload:item._id})
    }
    return <div className="suggesstions">
        <span>{item.name}</span>
        <Button type="primary" onClick={onClick} loading={state[item._id]}>Remove</Button>
    </div>
}
export default Followers;
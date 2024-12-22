import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { status, urls } from "../../Urls";
import { addRequest, removeRequest, suggestionsData } from "../../store";
import { fetchData } from "../../Functions/fetchData";
import { Button, Spin } from "antd";
import "./style.css";
function Suggestions() {
  const dispatch = useDispatch();
  const { ApiStatus, data } = useSelector((state) => state.e.suggestions);
  console.log("hshsjs")
  useEffect(() => {
    (async function () {
      const httpsConfig = {
        url: urls.suggestions,
        method: "GET",
      };
      dispatch(suggestionsData({ ApiStatus: status.pending, data: null }));
      const { success, data } = await fetchData(httpsConfig);
      dispatch(
        suggestionsData({
          ApiStatus: success ? status.success : status.error,
          data: success ? data.data.suggestions : null,
        })
      );
    })();
  }, []);
  if (ApiStatus === status.init || ApiStatus === status.pending) {
    return (
      <div className="spin3">
        <Spin size="large" />
      </div>
    );
  }
  return <div className="suggestions">
    {data.map((item)=>{
      return <SingleItem item={item} key={item._id} wantedData={"suggestions"}/>
    })}
  </div>;
}
export const SingleItem = React.memo(function({item,wantedData}){
  const dispatch = useDispatch();
  const postId = useSelector(state=>state.e.requestData[item._id]);
  console.log(postId);
  const onClick = async function(){
    const httpsConfig = {
      url:item.following?urls.unfollow:urls.follow,
      method:"POST",
      data:{userId:item._id},
    }
    dispatch(addRequest({id:item._id,modify:wantedData}));
    const {success,data} = await fetchData(httpsConfig);
    dispatch(removeRequest(item._id));
  }
  return <div className="suggestionsData">
    <span className="userName">{item.name}</span>
    <Button type="primary" onClick={onClick} loading={postId?true:false}>{item.following?"Following":"Follow"}</Button>
  </div>
})
export default Suggestions;

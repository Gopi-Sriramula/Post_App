import React, { useEffect } from "react";
import { status, urls } from "../../Urls";
import { fetchData } from "../../Functions/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { followingData } from "../../store";
import { Spin } from "antd";
import { SingleItem } from "../suggestions";

function Following() {
  const dispatch = useDispatch();
  const { ApiStatus, data } = useSelector((state) => state.e.following);
  console.log(ApiStatus, data);
  useEffect(() => {
    (async function (params) {
      const httpsConfig = {
        url: urls.followings,
        method: "GET",
      };
      dispatch(followingData({ApiStatus:status.pending,data:null}))
      const {success,data} = await fetchData(httpsConfig);
      dispatch(followingData({ApiStatus:success?status.success:status.error,data:success?data.data:null}))
    })();
  }, []);
  if(ApiStatus===status.init || ApiStatus===status.pending){
    return <div className="spin3">
      <Spin size="large"/>
    </div>
  }
  return <div className="suggestions">
    {data.map((item,i)=>{
      return <SingleItem item={item} key={i} wantedData={"following"}/>
    })}
  </div>;
}

export default Following;

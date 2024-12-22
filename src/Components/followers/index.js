import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { status, urls } from "../../Urls";
import { followersData } from "../../store";
import { fetchData } from "../../Functions/fetchData";
import { Spin } from "antd";
import { SingleItem } from "../suggestions";

function Followers() {
  const dispatch = useDispatch();
  const { ApiStatus, data } = useSelector((state) => state.e.followers);
  console.log(ApiStatus, data);
  useEffect(() => {
    (async function () {
      const httpsConfig = {
        url: urls.followers,
        method: "GET",
      };
      dispatch(followersData({ ApiStatus: status.pending, data: null }));
      const { success, data } = await fetchData(httpsConfig);
      dispatch(
        followersData({
          ApiStatus: success ?status.success : status.error,
          data: success ? data.data : null,
        })
      );
    })();
  }, []);
  if(ApiStatus===status.init || ApiStatus===status.pending){
     return <div className="spin3">
          <Spin size="large"/>
     </div>
  }
  return <div className="suggestions">
     {data.map((item)=>{
          return <SingleItem item={item} key={item._id} wantedData={"followers"}/>
     })}
  </div>;
}

export default Followers;

import React from "react";
import { Tabs } from "antd";
import Suggestions from "../Components/suggestions";
import Following from "../Components/following";
import Followers from "../Components/followers";
import { useNavigate, useParams } from "react-router-dom";
function Connections() {
  const navigate = useNavigate();
  const {id} = useParams();
  const onChange = function(e){
    navigate(`/connections/${e}`)
    return e;
  }
  return (
    <div className="tabs">
      <Tabs
      onChange={onChange}
        defaultActiveKey={id}
        items={[
          {
            label: "Following",
            key: "following",
            children: <Following/>,
          },
          {
            label: "Followers",
            key: "followers",
            children: <Followers/>,
          },
          {
            label: "Suggestions",
            key: "suggestions",
            children: <Suggestions/>,
          },
        ]}
      />
    </div>
  );
}

export default Connections;

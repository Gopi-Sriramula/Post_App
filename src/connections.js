import { Tabs } from "antd";
import Followers from "./followers.js";
import Following from "./following.js";
import Suggesstions from "./suggesstions.js";
import { useNavigate, useParams } from "react-router-dom";
const Connections = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const onChange = function (e) {
    navigate(`/connections/${e}`);
  };
  return (
    <Tabs
      defaultActiveKey={`${id}`}
      onChange={onChange}
      items={[
        { label: "Followers", key: "followers", children: <Followers /> },
        { label: "Following", key: "following", children: <Following /> },
        {
          label: "Suggesstions",
          key: "suggesstions",
          children: <Suggesstions />,
        },
      ]}
    />
  );
};
export default Connections;

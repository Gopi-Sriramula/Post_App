import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import urls, { ApiStatus } from "./urls";
import fetchData2 from "./fetchData2";
import { Input, message, Spin, Form, Modal, Button } from "antd";
import PostsList from "./postslist.js";
import { useNavigate } from "react-router-dom";
const LoggedUser = function () {
  const navigate = useNavigate()
  const [state, setState] = useState(false);
  const { apiStatus, data } = useSelector((state) => state.b);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      dispatch({
        type: "userInfo",
        payload: { apiStatus: ApiStatus.pending, data: null },
      });
      const httpConfig = {
        url: urls.userInfo,
        method: "GET",
      };
      const { success, data } = await dispatch(fetchData2(httpConfig));
      if (success) {
        dispatch({
          type: "userInfo",
          payload: { apiStatus: ApiStatus.success, data: data },
        });
      } else {
        dispatch({
          type: "userInfo",
          payload: { apiStatus: ApiStatus.error, data: null },
        });
      }
    })();
  }, []);
  const onFinish = async function(data1){
    setState(false);
    const httpConfig = {
      url:urls.createPost,
      method:"POST",
      data:data1,
    }
    const {success,data}= await dispatch(fetchData2(httpConfig));
    if(success){
      dispatch({type:"postAdd",payload:data.post})
    }
  };
  if (apiStatus === "init" || apiStatus === ApiStatus.pending) {
    return (
      <div className="spin">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="userData">
      <div className="userInfo">
        <div className="userInfo1">
          <button
            className="material-icons"
            onClick={() => {
              setState(true);
            }}
          >
            add
          </button>
          <div onClick={()=>{navigate("/connections/followers")}}>
            <b>{data.followers}</b>
            <b>Followers</b>
          </div>
          <div onClick={()=>{navigate("/connections/following")}}>
            <b>{data.following}</b>
            <b>Following</b>
          </div>
          <div>
            <b>{data.posts}</b>
            <b>posts</b>
          </div>
        </div>
        <div>
          <h3>{data.gender ? "He/Him" : "She/Her"}</h3>
          <h3>{data.name}</h3>
          <h3>{data.email}</h3>
        </div>
        <Model state={state} setState={setState} onFinish={onFinish}/>
      </div>
      <PostsList />
    </div>
  );
};
const Model = function ({ state, setState,onFinish }) {
  return (
    <Modal open={state} closable={false} footer={false}>
      <Form onFinish={onFinish}>
        <span
          className="close"
          onClick={() => {
            setState(false);
          }}
        >
          &times;
        </span>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="content"
          rules={[{ required: true, message: "Content is required" }]}
        >
          <Input.TextArea placeholder="TextArea" />
        </Form.Item>
        <Form.Item
          name="imageurls"
          rules={[
            { required: true, message: "url is required" },
            { type: "url", message: "Give valid url" },
          ]}
        >
          <Input placeholder="url" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Create Post
        </Button>
      </Form>
    </Modal>
  );
};
export default LoggedUser;

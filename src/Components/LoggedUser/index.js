import { useEffect, useRef, useState } from "react";
import "./style.css";
import { status, urls } from "../../Urls";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../Functions/fetchData";
import { Button, Form, Input, Modal, Spin } from "antd";
import { addNewPost, incrementPosts, userData } from "../../store";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";
function LoginUser() {
  const form = useRef();
  const dispatch = useDispatch();
  const { ApiStatus, data } = useSelector((state) => state.b);
  const [bool,setBool] = useState(false);
  useEffect(() => {
    (async function () {
      const httpsConfig = {
        url: urls.userInfo,
        method: "GET",
      };
      dispatch(userData({ status: status.pending, data: null, bool: false }));
      const { success, data } = await fetchData(httpsConfig);
      dispatch(
        userData({ status: status.success, data: data.data, bool: success })
      );
    })();
  }, []);
  const onFinish = async function(data1){
    setBool(false)
    const obj1 = {...data1,imageUrls:[data1.imageUrls]}
    console.log(obj1);
    const httpsConfig = {
      url:urls.createPost,
      method:"POST",
      data:obj1
    }
    form.current.resetFields();
    const {success,data} = await fetchData(httpsConfig);
    if(success){
      dispatch(addNewPost(data.data.post));
      dispatch(incrementPosts())
    }
  }
  if (ApiStatus === status.init || ApiStatus === status.pending) {
    return (
      <div className="loader">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="userInfo">
      <div className="userDetails">
        <button className="material-icons" onClick={()=>setBool(true)}>
          add
        </button>
        <Link to="/connections/followers" className="link">
          <b>Followers</b>
          <span>{data.followers}</span>
        </Link >
        <Link to="/connections/following" className="link">
          <b>Following</b>
          <span>{data.following}</span>
        </Link>
        <div className="link">
          <b>Posts</b>
          <span>{data.posts}</span>
        </div>
      </div>
      <div className="userDetails2">
        <h3>{data.gender == "MALE" ? "He/Him" : "She/Her"}</h3>
        <h3 style={{ textTransform: "capitalize" }}>{data.name}</h3>
        <h3>{data.email}</h3>
      </div>
      <Modal open={bool} footer={false} closable={false}>
        <span className="close" onClick={()=>{setBool(false)}}>
          &times;
        </span>
        <Form ref={form} layout="vertical" className="form2" onFinish={onFinish}>
          <Form.Item
            label="Title:"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="title" />
          </Form.Item>
          <Form.Item
            label="content:"
            name="content"
            rules={[{ required: true, message: "Content is required" }]}
          >
            <TextArea placeholder="Content" />
          </Form.Item>
          <Form.Item
            label="ImageUrl"
            name="imageUrls"
            rules={[
              { required: true, message: "Content is required" },
              { type: "url", message: "Please give valid url" },
            ]}
          >
            <Input placeholder="ImageUrls" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Post
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
export default LoginUser;

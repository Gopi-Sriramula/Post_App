import { Button, Form, Input } from "antd";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { status, urls } from "../../Urls";
import { fetchData } from "../../Functions/fetchData";
import { loginChangeStatus } from "../../store";
import { Link, useNavigate } from "react-router-dom";
function Login({setState}) {
  const navigate = useNavigate({setState});
  const { ApiStatus } = useSelector((state) => state.a.loginStatus);
  console.log(ApiStatus);
  const dispatch = useDispatch();
  const onFinish = async function (data1) {
    const httpsConfig = {
      url: urls.login,
      method: "POST",
      data: data1,
    };
    dispatch(loginChangeStatus(status.pending));
    const { success, data } = await fetchData(httpsConfig);
    dispatch(loginChangeStatus(success ? status.success : status.error));
    if (success) {
      localStorage.setItem("token", data.data.token);
      navigate("/");
      setState(true);
    }
  };
  return (
    <div className="form">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email:"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter valid email" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password:"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input placeholder="Password" />
        </Form.Item>
        <Button block htmlType="submit" loading={ApiStatus === status.pending}>
          Login
        </Button>
        <h4 className="h4">Don't have an account ? <Link to="/signup">SignUp</Link></h4>
      </Form>
    </div>
  );
}

export default Login;

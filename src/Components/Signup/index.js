import { Button, Form, Input, Radio } from "antd";
import { status, urls } from "../../Urls";
import { useDispatch, useSelector } from "react-redux";
import { signupChangeStatus } from "../../store";
import { fetchData } from "../../Functions/fetchData";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const { ApiStatus } = useSelector((state) => state.a.signupStatus);
  console.log(ApiStatus);
  const dispatch = useDispatch();
  const onFinish = async function (data1) {
    const httpsConfig = {
      url: urls.signup,
      method: "POST",
      data: data1,
    };
    dispatch(signupChangeStatus(status.pending));
    const {success,data} =await fetchData(httpsConfig);
    dispatch(signupChangeStatus(success?status.success:status.error));
    if(success){
      alert("Signedup Successfully");
      navigate("/");
    }
  };
  return (
    <div className="form">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name:"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Email:"
          name="email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password:"
          name="password"
          rules={[{ required: true, message: "Password is must and should" }]}
        >
          <Input placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Select Gender:"
          name="gender"
          rules={[{ required: true, message: "gender is required" }]}
        >
          <Radio.Group>
            <Radio value="MALE">Male</Radio>
            <Radio value="FEMALE">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="City:"
          name="city"
          rules={[{ required: true, message: "City is required" }]}
        >
          <Input placeholder="City" />
        </Form.Item>
        <Button block htmlType="submit" loading={ApiStatus===status.pending}>
          SignUp
        </Button>
        <h4 className="h4">Have an account ? <Link to="/">Login</Link></h4>
      </Form>
    </div>
  );
}

export default SignUp;

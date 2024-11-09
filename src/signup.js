import { Button,Form,Input,Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import urls, { ApiStatus } from "./urls";
import fetchData1 from "./fetchData1";
import { Link, useNavigate } from "react-router-dom";

const Signup = function(){
    const dispatch = useDispatch();
    const {apiStatus} = useSelector(state=>state.a.signup);
    const navigate = useNavigate();
    const onFinish = async function(data1){
        dispatch({type:"signup",payload:{apiStatus:ApiStatus.pending}})
        const httpConfig = {
            url:urls.signup,
            method:"POST",
            data:data1
        }
        const {success}= await dispatch(fetchData1(httpConfig));
        if(success){
            dispatch({type:"signup",payload:{apiStatus:ApiStatus.success}});
            alert("Signup Successfully")
            navigate("/login");
        }
        else{
            dispatch({type:"signup",payload:{apiStatus:ApiStatus.error}});
            alert("Signup Failed");
        }
    }
    return <div className="form">
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={[{required:true,message:"Name is required"}]}>
                <Input placeholder="Name"/>
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{required:true,message:"Email is required"},{type:"email",message:"Enter valid email"}]}>
                <Input placeholder="Email"/>
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{required:true,message:"Password is required"}]}>
                <Input.Password placeholder="password"/>
            </Form.Item>
            <Form.Item label="City" name="city" rules={[{required:true,message:"City is required"}]}>
                <Input placeholder="City"/>
            </Form.Item>
            <Form.Item label="Select Gender" name="gender" rules={[{required:true,message:"Gender is required"}]}>
                <Radio.Group>
                    <Radio value="MALE">Male</Radio>
                    <Radio value="FEMALE">Female</Radio>
                </Radio.Group>
            </Form.Item>
            <Button htmlType="submit" block loading={apiStatus===ApiStatus.pending}>Sign Up</Button>
            <h4>Have an account ? <Link to="/login" className="link">Login</Link></h4>
        </Form>
    </div>
}
export default Signup;
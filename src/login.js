import {Button, Form,Input} from "antd";
import { useDispatch, useSelector } from "react-redux";
import urls, { ApiStatus } from "./urls";
import fetchData1 from "./fetchData1";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./App";
const Login = function(){
    const {setisUserLogin} = useContext(AppContext);
    const navigate = useNavigate();
    const {apiStatus,key} = useSelector(state=>state.a.login);
    const dispatch = useDispatch();
    console.log(apiStatus,key);
    const onFinish =async function(data1){
        dispatch({type:"login",payload:{apiStatus:ApiStatus.pending,key:null}});
        const httpConfig = {
            url:urls.login,
            method:"POST",
            data:data1,
        }
        const {success,data}= await dispatch(fetchData1(httpConfig));
        if(success){
            localStorage.setItem("token",data.token);
            dispatch({type:"login",payload:{apiStatus:ApiStatus.success,key:data.token}});
            navigate("/");
            setisUserLogin(true);
        }
        else{
            dispatch({type:"login",payload:{apiStatus:ApiStatus.error,key:null}})
        }
    }
    return <div className="form">
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email" rules={[{required:true,message:"Email is required"},{type:"email",message:"Enter valid email"}]}>
                <Input placeholder="Email"/>
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{required:true,message:"Email is required"}]}>
                <Input.Password placeholder="Password"/>
            </Form.Item>
            <Button htmlType="submit" block loading={apiStatus===ApiStatus.pending}>Login</Button>
            <h4>Don't have an account ? <Link to="/signup" className="link">Sign Up</Link></h4>
        </Form>
    </div>
}
export default Login;
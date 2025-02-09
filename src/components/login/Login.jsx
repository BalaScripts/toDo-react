import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import { Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [value, setValue] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setValue({...value, username: e.target.value,});
  };

  const handlePassword = (e) => {
    setValue({...value, password: e.target.value,});
  };
  const dummyLogin = () => {
    // Hardcoded mock credentials for testing
    const mockUser = {
      username: "test",
      password: "test",
    };

    if (value.username === mockUser.username && value.password === mockUser.password) {
      // Simulate a successful response
      const mockResponse = {
        token: "dummy-jwt-token",
        userData: { username: "testuser" },
      };
      setValue(mockResponse);
      localStorage.setItem("token", mockResponse.token); // Store the mock token
      reset()
      navigate("/task");
      toast.success("Login successfully..!");
    } else {
      toast.error("Invalid User..!");
    }
  };

  const userenter = (e) => {
    if (e.key === 'Enter') {
      document.getElementById('password').focus();
    }
  };
  const passwordenter = (e) => {
    if (e.key === 'Enter') {
        document.getElementById('').focus();
    }
  };

  const reset = () => {
    setValue({
      ...value,
      username: "",
      password: "",
    });

  };
  return (
    <>
      <Toaster position="bottom-right" />
     <div className='flex h-screen justify-center items-center !bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
        <Card className='flex flex-wrap !rounded-xl !w-full sm:!w-[100%] md:!w-[45%] lg:!w-[49%] border-4'>
            <div className='flex flex-col justify-center items-center gap-3 !w-full sm:!w-[100%] md:!w-[45%] lg:!w-[49%] bg-blue-400 p-4'>
                <div className='capitalize text-4xl font-bold text-[white]'>login</div>
                <div className='text-[white] flex-wrap'>Track Your Goal's</div>
                <div className='flex flex-col items-center gap-4'>
                <div className='!rounded-full !h-[100px] !w-[100px] border-2 border-[white] flex items-center justify-center'>
                <img src="./src/assets/cc.png" className='!rounded-full'/>
                </div>
                <div className='text-[white] uppercase text-xl font-semibold'>BALAMURUGAN</div>
                </div>
            </div>
            <div className='!w-full sm:!w-[100%] md:!w-[45%] lg:!w-[49%] flex gap-4 flex-col justify-center items-center p-4'>
                <div className='!capitalize font-semibold text-xl'>Admin login</div>
                
                <Form.Control type="text" onChange={handleUsername} value={value.username} id='user' onKeyDown={userenter} className='' color='success' size='small' label="username"   />
                <Form.Control type="password" onChange={handlePassword} value={value.password} id='password' onKeyDown={passwordenter} className='' color='warning'  size='small' label="password"/>
                
                <Button size="small" onClick={dummyLogin} id='button' variant='contained' className='!capitalize !bg-blue-500 !w-[125px]'>login</Button>
            </div>
        </Card>
      </div>

  
    </>
  );
};

export default Login;

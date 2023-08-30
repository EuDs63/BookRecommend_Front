import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { userRegister, userInfo } from "@/utils/api"
export function SignUp() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  //注册
  function handleSignUp(){
    //const history = useHistory();
    console.log(name + " try to sign up");
    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    console.log("当前注册时间是:"+formattedTime)
    userRegister({
        name: name,
        password: password,
        register_time: formattedTime,
    }).then((resp)=>{
      var code = resp.data['code'].toString();
      var message = resp.data['msg'];
      console.log(message);
      if (code === '0') {
        //getUserInfo(form.email);
        //router.push("/profile");
        alert(message);
        navigateTo('/home');//这里应该打开一个标签推荐页面
        // const now = new Date();
        // setRegister_time(formattedTime)
        console.log("当前注册时间是:" + register_time)
      } else {
        console.log(name + " try to sign up, but fail");
        alert(message);
      }
      //console.log(resp);
    });
}

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Name" size="lg" onChange={handleNameChange}/>
            <Input type="password" label="Password" size="lg" onChange={handlePasswordChange} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSignUp}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;

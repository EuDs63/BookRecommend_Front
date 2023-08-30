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
import { userLogin, userInfo } from "@/utils/api"




export function SignIn() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  // 登录
  function handleSignIn() {
    //const history = useHistory(); 
    console.log(username + " try to sign in");
    userLogin({
      username: username,
      password: password,
    }).then((resp) => {
      var code = resp.data['code'].toString();
      var message = resp.data['msg'];
      console.log(message);
      if (code === '0') {
        //getUserInfo(form.email);
        //router.push("/profile");
        alert(message);
        navigateTo('/home');
      } else {
        console.log(email + " try to sign in, but fail");
        alert(message);
      }
      //console.log(resp);
    });

  }

                  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
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
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input type="email" label="Email" size="lg" onChange={handleUsernameChange} />
            <Input type="password" label="Password" size="lg" onChange={handlePasswordChange} />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSignIn}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;

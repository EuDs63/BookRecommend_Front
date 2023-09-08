import { Link } from "react-router-dom";
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin, userInfo, userAutoLogin } from "@/utils/api";
import { useUser } from "../../context/UserContext";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { setIsLoggedIn, login } = useUser(); // 使用useUser钩子来获取用户状态
  const [secondsToShowAlert, setSecondsToShowAlert] = useState(3);
  const [open, setOpen] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    // 自动登录
    userAutoLogin().then((resp) => {
      var code = resp.data["code"].toString();
      var token = resp.data["token"];
      if (code === "0") {
        setUsername(resp.data["user"]["username"]);
        setPassword("password");
        handleSignInContext(resp.data["user"], token);
        
        setOpen(true);

        const timer = setInterval(() => {
          setSecondsToShowAlert((prevSeconds) => {
            if (prevSeconds > 0 ) {
              return prevSeconds - 1;
            } else {
              return 0
            }
          });
        }, 1000); // 每秒减少一次
    
        // 在计时结束时进行页面跳转
        setTimeout(() => {
          window.location.href = '/user/main'; // 将网址替换为您希望跳转的网址
          clearInterval(timer); // 清除定时器
        }, secondsToShowAlert * 1000);
    
        // 在组件卸载时清除计时器，以防止内存泄漏
        return () => {
          clearInterval(timer);
        };

      }
    });

  }, []);

  // 验证成功
  const handleSignInContext = (data, token) => {
    // 更新用户状态
    setIsLoggedIn(true);
    login(data)
    // 根据用户选择，将 token 存储在 localStorage 或 sessionStorage 中
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }

  };


  // 登录
  function handleSignIn() {
    userLogin({
      username: username,
      password: password,
    }).then((resp) => {
      var code = resp.data["code"].toString();
      var message = resp.data["msg"];
      var token = resp.data["token"];
      if (code === "0") {
        alert(message);
        navigateTo("/user/main");
        handleSignInContext(resp.data["user"], token);
      } else {
        alert(message);
      }
    });
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
            <Input label="Name" size="lg" onChange={handleUsernameChange} value={username} />
            <Input
              type="password"
              label="Password"
              size="lg"
              onChange={handlePasswordChange} value={password}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)} />
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
      <div className="">
        {/* <Alert
              className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
            >
              自动登录成功
            </Alert> */}

        <Alert
          open={open} onClose={() => setOpen(false)} className="w-1/2 m-auto justify-center" color="green">
          自动登录验证成功,{secondsToShowAlert}秒后跳转到主页，或者点击<a href="/user/main">这里</a>跳转
        </Alert>
      </div>
    </>
  );
}

export default SignIn;

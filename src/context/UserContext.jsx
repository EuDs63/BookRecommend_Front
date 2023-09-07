import React, { createContext, useContext, useState,useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateUser,updateLoginStatus } from '../Redux/actions/userActions';

// 创建一个Context对象
const UserContext = createContext();

// 创建一个Context Provider组件，用于包装整个应用程序，提供用户状态
export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 默认用户未登录

  const [user, setUser] = useState({
    avatar_path: "static/avatar/default.png",
    is_admin: false,
    register_time: "",
    user_id: null,
    username: ""
  });

  // 从 Redux 中获取状态
  const reduxUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  // 同步 Redux 中的用户信息到本地状态
  // 该 useEffect 仅在 reduxUser 发生变化时执行
  useEffect(() => {
    setUser(reduxUser);
    setIsLoggedIn(reduxUser.isLoggedIn);
  }, [reduxUser]);

  const login = (userData) => {
    setUser({ ...userData });
    setIsLoggedIn(true);

    // 更新 Redux 状态
    dispatch(updateUser(userData));
    dispatch(updateLoginStatus(true));
  };

  const logout = () => {
    setUser({
      isLoggedIn: false, // 用户登录状态，默认为未登录
      user_id: null,      // 用户ID
      username: '',      // 用户名
      avatar_path: '',    // 头像路径
      register_time: "",  // 注册时间
    });
    setIsLoggedIn(false);

    // 清除本地存储中的 token
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    // 清除 Redux 状态
    dispatch(updateUser({ // 清除用户信息
      avatar_path: "static/avatar/default.png",
      is_admin: false,
      register_time: "",
      user_id: null,
      username: "",
    }));
    dispatch(updateLoginStatus(false)); // 更新登录状态
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// 自定义钩子，用于访问用户状态
export function useUser() {
  return useContext(UserContext);
}


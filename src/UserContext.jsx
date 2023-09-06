import React, { createContext, useContext, useState,useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateUser,updateLoginStatus } from './userActions';

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
    //dispatch(setIsLoggedIn(true));
  };

  const logout = () => {
    setUser({
      avatar_path: "static/avatar/default.png",
      is_admin: false,
      register_time: "",
      user_id: null,
      username: ""
    });
    setIsLoggedIn(false);

    // 清除 Redux 状态
    dispatch(updateUser({ // 清除用户信息
      avatar_path: "static/avatar/default.png",
      is_admin: false,
      register_time: "",
      user_id: null,
      username: ""
    }));
    dispatch(updateLoginStatus(false)); // 更新登录状态
    //dispatch(setIsLoggedIn(false));
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


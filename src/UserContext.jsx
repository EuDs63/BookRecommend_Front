import React, { createContext, useContext, useState } from "react";

// 创建一个Context对象
const UserContext = createContext();

// 创建一个Context Provider组件，用于包装整个应用程序，提供用户状态
export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 默认用户未登录

  const [user, setUser] = useState({
    isLoggedIn: false,
    avatar_path: "static/avatar/default.png",
    is_admin: false,
    register_time: "",
    user_id: null,
    username: ""
  });

  const login = (userData) => {
    setUser({ ...userData, isLoggedIn: true });
  };

  const logout = () => {
    setUser({
      isLoggedIn: false,
      avatar_path: "static/avatar/default.png",
      is_admin: false,
      register_time: "",
      user_id: null,
      username: ""
    });
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn,user,login,logout }}>
      {children}
    </UserContext.Provider>
  );
}

// 自定义钩子，用于访问用户状态
export function useUser() {
  return useContext(UserContext);
}


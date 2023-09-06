import React, { createContext, useContext, useState } from "react";

// 创建一个Context对象
const UserContext = createContext();

// 创建一个Context Provider组件，用于包装整个应用程序，提供用户状态
export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 默认情况下用户未登录

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

// 自定义钩子，用于访问用户状态
export function useUser() {
  return useContext(UserContext);
}

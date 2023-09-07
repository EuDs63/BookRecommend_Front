// userActions.js

import { UPDATE_USER,UPDATE_LOGIN_STATUS } from './actionTypes';

// 更新用户信息
export const updateUser = (userData) => ({
    type: UPDATE_USER,
    payload: userData,
  });

// 更新登录状态
export const updateLoginStatus = (isLoggedIn) => ({
    type: UPDATE_LOGIN_STATUS,
    payload: isLoggedIn,
  });
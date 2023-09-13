// userActions.js

import { UPDATE_USER, UPDATE_LOGIN_STATUS, UPDATE_AVATAR } from './actionTypes';

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

// 更新头像
export const updateAvatar = (avatar_path) => ({
  type: UPDATE_AVATAR,
  payload: user.avatar_path,
});

// 添加搜索历史
export function addToSearchHistory(value) {
  return { type: 'ADD_TO_SEARCH_HISTORY', payload: value };
}
// 清空搜索历史
export function clearSearchHistory() {
  return { type: 'CLEAR_SEARCH_HISTORY' };
}
// userReducer.js

import { UPDATE_USER, UPDATE_LOGIN_STATUS } from '../actionTypes';

const initialState = {
    isLoggedIn: false, // 用户登录状态，默认为未登录
    user_id: null,      // 用户ID
    username: '',      // 用户名
    avatar_path: '',    // 头像路径
    register_time: "",  // 注册时间
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                ...action.payload, // 使用传入的用户信息更新状态
            };
        case UPDATE_LOGIN_STATUS:
            // 更新登录状态
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;

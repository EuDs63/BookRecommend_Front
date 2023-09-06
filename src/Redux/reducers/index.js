// reducers/index.js

import { combineReducers } from 'redux';
import userReducer from './userReducer'; // 导入用户 reducer

const rootReducer = combineReducers({
  user: userReducer,
  // 添加其他 reducer
});

export default rootReducer; // 导出根 reducer

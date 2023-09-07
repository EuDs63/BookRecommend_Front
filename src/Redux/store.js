import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 使用本地存储
import rootReducer from './reducers'; // 导入你的根 reducer

const persistConfig = {
  key: 'root', // 根键，用于存储在本地存储中的数据
  storage,     // 使用本地存储
  // 可选的配置选项
  // whitelist: ['user'], // 只持久化指定 reducer 的数据
  // blacklist: ['cart'], // 排除指定 reducer 的数据
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };

import { configureStore } from "@reduxjs/toolkit";
import usersReduser from "./modules/user";
// 持节化处理
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// 配置文件
/* const persistConfig = {
  key: "root",
  version: 1,
  storage,
  设置白名单
  whitelist: ["token"],
}; */

const store = configureStore({
  reducer: {
    // 进行持久化操作，使用persistReducer将对象包起来
    // user: persistReducer(persistConfig, usersReduser),
  },
});

export default store;

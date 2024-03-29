import { configureStore } from "@reduxjs/toolkit";
import usersReduser from "./modules/user";
// 对reducer下的user进行断言，引入所需类型
import type { Reducer, AnyAction } from "@reduxjs/toolkit";
import type { UsersState } from "./modules/user";
import type { PersistPartial } from "redux-persist/es/persistReducer";
// 添加signReduser
import signsReducer from "./modules/sign";
// 持节化处理
import {
  persistStore,
  persistReducer,

  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// 引入默认的useDispatch
import { useDispatch } from "react-redux";

// 配置文件
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  /* 设置白名单 */
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    // 进行持久化操作，使用persistReducer将对象包起来
    // 持久化后，产生问题即index.tsx下的 RootState的类型无法正确推断，故需要对reducer下的user进行断言，让它保持自己的类型
    user: persistReducer(persistConfig, usersReduser) as Reducer<
      UsersState & PersistPartial,
      AnyAction
    >,

    // 添加SignState
    signs: signsReducer,
  },
  // 中间键设置
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
});

// store 配置持久化
persistStore(store);

// 引出RootState, AppDispatch, useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
export const useAppDispatch: () => AppDispath = useDispatch;

export default store;

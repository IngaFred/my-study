import http from "../../utils/http";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type Infos = {
  [index: string]: unknown;
};
export type signState = {
  infos: Infos;
};
// 请求参数
type Time = {
  userid: string;
};

const signsSlice = createSlice({
  name: "signs",
  initialState: {
    infos: {},
  } as signState,
  // 更新infos
  reducers: {
    updateInfos(state, action: PayloadAction<Infos>) {
      state.infos = action.payload;
    },
  },
});
// 获取用户打卡信息详情 get
export const getSignsAction = createAsyncThunk(
  "signs/getSignsAction",
  async (payload: Time) => {
    const ret = await http.get("/signs/time", payload);
    return ret;
  }
);
// 更新用户打卡信息详情 put
export const putSignsAction = createAsyncThunk(
  "/signs/putSignsAction",
  async (payload: Time) => {
    const ret = await http.put("/signs/time", payload);
    return ret;
  }
);

// 将同步方法给从reducers中解构出来
export const { updateInfos } = signsSlice.actions;

export default signsSlice.reducer;

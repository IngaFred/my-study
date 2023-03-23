import http from '../../utils/http';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';

export type Infos = {
    [index: string]: unknown;
}
export type SginState= {
    infos: Infos
}
// 请求参数
type time = {
    userid: string
}

const sginsSlice = createSlice({
    name: 'sgins',
    initialState: {
        infos: {}
    }as SginState,
    // 更新infos
    reducers: {
        updateInfos(state, action:PayloadAction<Infos>){
            state.infos = action.payload;
        },
    }
})
// 获取用户打卡信息详情 get
export const getSginsAction = createAsyncThunk('sgins/getSginsAction',async (payload: time) => {
    const ret = await http.get('/signs/time', payload);
    return ret;
})
// 更新用户打卡信息详情 put
export const putSginsAction = createAsyncThunk('/sgins/putSginsAction',async (payload: time) => {
    const ret = await http.put('/signs/time', payload);
    return ret;
})

// 将同步方法给从reducers中解构出来
export const { updateInfos } = sginsSlice.actions;

export default sginsSlice.reducer;
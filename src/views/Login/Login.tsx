import React from 'react'
import styles from './Login.module.scss'
// antd
import { Button, message } from 'antd'
// token
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useAppDispatch } from '../../store'
// 引入登录接口
import { loginAction, updateInfos, updateToken } from '../../store/modules/user'
export default function Login() {
  // 从useSelector中解出User中的token
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useAppDispatch();
  const handlerLogin = ()=> {
    dispatch(loginAction({ email: '', pass: ''})).then(
      (action) =>{
        // 对action.payload和其下的数据类型，进行断言
        const {errcode, token} = (action.payload as {[index: string]: unknown}).data as {[index: string]: unknown};
        if(errcode === 0 && typeof token === 'string'){
          //类型正确，且token更新成功
          dispatch(updateToken(token))
          message.success("登录成功")
        }
        else{
          message.error("登录失败")
        }
      }
    );
  };
  return (
    <div>
      Login
      <br/>
      <Button onClick={ handlerLogin }>登录</Button>
      { token }
    </div> 
  )
}


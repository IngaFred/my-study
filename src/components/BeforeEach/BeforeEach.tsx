import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, matchRoutes, Navigate } from "react-router-dom";
// 引入routers表
import { routes } from "../../router";
// 获取dispacth
import { useAppDispatch } from "../../store";
// 引入 获取用户信息的infosAction方法
import { infosAction } from "../../store/modules/user";

interface BeforeEachProps {
  children?: React.ReactNode;
}
export default function BeforeEach(props: BeforeEachProps) {
  const location = useLocation();
  const matchs = matchRoutes(routes, location);
  // 通过useAppDispacth 获取dispatch
  const dispatch = useAppDispatch();

  // console.log(matchs);
  // 先判断matchs列表组，是否为空
  if (Array.isArray(matchs)) {
    // 不为空，将matchs中最后一个路由的meta保存
    const meta = matchs[matchs.length - 1].route.meta;
    // 验证属性中的auth属性 查看是否具有显示权限
    if (meta?.auth) {
      // 测试
      // 权限为true，不能进入，则重定向到其他位置
      // return <Navigate to="/login" />;
     dispatch(infosAction()).then((actions)=>
     {
      console.log( actions.payload )
     });

    }
  }
  return <>{props.children}</>;
}

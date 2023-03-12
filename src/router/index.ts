// 引入react-router-dom件
import { createBrowserRouter } from "react-router-dom";
// 引入路由类型
import type { RouteObject } from "react-router-dom";
// 引入React方法进行element的创建 React.createElement(页面模块)
import React from "react";
// 懒加载的方式引入对应页面 配置suspense在index.tsx
import { lazy } from "react";
// icons
import {
  CopyOutlined,
  CalendarOutlined,
  WarningOutlined,
  FileAddOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";

// 使用lazy中的回调函数导入页面路径
const Home = lazy(() => import("../views/Home/Home"));
const Sign = lazy(() => import("../views/Sign/Sign"));
const Exception = lazy(() => import("../views/Exception/Exception"));
const Apply = lazy(() => import("../views/Apply/Apply"));
const Check = lazy(() => import("../views/Check/Check"));
const Login = lazy(() => import("../views/Login/Login"));

// import BeforeEach from "../components/BeforeEach/BeforeEach";
// 懒加载的形式引入
const BeforeEach = lazy(() => import("../components/BeforeEach/BeforeEach"));

// meta?: MetaHTMLAttributes
// import type { MetaHTMLAttributes } from 'react'

// 扩展d.ts文件中 react-router 中RouteObject的（IndexRouteObject || NonIndexRouteObject）两个接口
declare module "react-router" {
  interface IndexRouteObject {
    meta?: {
      menu?: boolean;
      title?: string;
      icon?: React.ReactNode;
      auth?: boolean;
    };
  }

  interface NonIndexRouteObject {
    meta?: {
      menu?: boolean;
      title?: string;
      icon?: React.ReactNode;
      auth?: boolean;
    };
  }
}

// 定义路由表组及类型
// export 输出个接口可以调用
export const routes: RouteObject[] = [
  // 开始编写对应路由
  {
    path: "/",
    // element: <Home /> 这种写法是错误的，在TS里会认为这是一个类型
    // 不使用全局守卫形式
    // element: React.createElement(Home),
    // 使用全局守卫形式(全局守卫,属性,子项) 套在一级路由下
    element: React.createElement(BeforeEach, null, React.createElement(Home)),
    meta: {
      menu: true,
      title: "首页",
      // 图标对应
      icon: React.createElement(CopyOutlined),
      // 权限认证
      auth: true,
    },
    children: [
      {
        path: "sign",
        element: React.createElement(Sign),
        meta: {
          menu: true,
          title: "签到",
          icon: React.createElement(CalendarOutlined),
          auth: true,
        },
      },
      {
        path: "exception",
        element: React.createElement(Exception),
        meta: {
          menu: true,
          title: "异常",
          icon: React.createElement(WarningOutlined),
          auth: true,
        },
      },
      {
        path: "apply",
        element: React.createElement(Apply),
        meta: {
          menu: true,
          title: "添加",
          icon: React.createElement(FileAddOutlined),
          auth: true,
        },
      },
      {
        path: "check",
        element: React.createElement(Check),
        meta: {
          menu: true,
          title: "审核",
          icon: React.createElement(ScheduleOutlined),
          auth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    element: React.createElement(BeforeEach, null, React.createElement(Login)),
  },
];
// 创建路由对象,createBrowserRouter(路由表)
const router = createBrowserRouter(routes);
// 提供对外接口
export default router;

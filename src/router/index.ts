// 引入react-router-dom件
import { createBrowserRouter } from "react-router-dom";
// 引入路由类型
import type { RouteObject } from 'react-router-dom'
// 引入React方法进行element的创建 React.createElement(页面模块)
import React from "react";
// 懒加载的方式引入对应页面
import { lazy } from "react";

// 使用lazy中的回调函数导入页面路径
const Home = lazy(()=> import('../views/Home/Home'))
const Sign = lazy(()=> import('../views/Sign/Sign'))
const Exception = lazy(()=> import('../views/Exception/Exception'))
const Apply = lazy(()=> import('../views/Apply/Apply'))
const Check = lazy(()=> import('../views/Check/Check'))
const Login = lazy(()=> import('../views/Login/Login'))

// meta?: MetaHTMLAttributes
import type { MetaHTMLAttributes } from 'react'

// icons
import {
    CopyOutlined,
    CalendarOutlined,
    WarningOutlined,
    FileAddOutlined,
    ScheduleOutlined,
  } from '@ant-design/icons'

// 扩展d.ts文件中 react-router 中RouteObject的（IndexRouteObject || NonIndexRouteObject）两个接口
declare module 'react-router' {
    interface IndexRouteObject {
      meta?: {
        menu?: boolean
        title?: string
        icon?: React.ReactNode 
        auth?: boolean
      }
    }
    
    interface NonIndexRouteObject {
      meta?: {
        menu?: boolean
        title?: string
        icon?: React.ReactNode  
        auth?: boolean
      }
    }
  }


// 定义路由表组及类型
const routers: RouteObject[] = [
    // 开始编写对应路由
    {
        path: '/',
        // element: <Home /> 这种写法是错误的，在TS里会认为这是一个类型
        element: React.createElement(Home),
        meta: {
            menu: true,
            title: '首页',
            icon: React.createElement(CopyOutlined),
            auth: true
          },
        children:[
            {
                path: 'sign',
                element: React.createElement(Sign)
            },
            {
                path: 'exception',
                element: React.createElement(Exception)
            },
            {
                path: 'apply',
                element: React.createElement(Apply)
            },
            {
                path: 'check',
                element: React.createElement(Check),
                
            },
        ]
    },
    {
        path: '/login',
        element: React.createElement(Login),
    }
]; 
// 创建路由对象,createBrowserRouter(路由表)
const router = createBrowserRouter(routers) 
// 提供对外接口
export default router;

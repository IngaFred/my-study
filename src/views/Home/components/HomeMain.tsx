import React, { Suspense } from "react";
// 二级路由
import { Outlet } from "react-router-dom";

export default function HomeMain() {
  return (
    <div>
      {/* 懒加载包裹 */}
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}

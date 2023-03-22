import React from "react";
import styles from "./Home.module.scss";
// 进行二级路由测试
import { Outlet } from "react-router-dom";
import WelcomeIIIIrcc from "../../components/test/WelcomeIIIIrcc";

export default function () {
  return (
    <div>
      Home
      {/* <WelcomeIIIIrcc name={"MyPropsName"}></WelcomeIIIIrcc> */}
      <Outlet />
    </div>
  );
}

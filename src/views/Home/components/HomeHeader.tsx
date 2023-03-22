import React from "react";
import classNames from "classnames";
import styles from "../Home.module.scss";
import { Dropdown, Badge, Space, Avatar } from "antd";
import type { MenuProps } from "antd";
import { BellOutlined, AntDesignOutlined } from "@ant-design/icons";

const items1: MenuProps["items"] = [
  {
    key: "1",
    label: <div>信息提示</div>,
  },
];
const items2: MenuProps["items"] = [
  {
    key: "1",
    label: <div>个人中心</div>,
  },
  {
    key: "2",
    label: <div>退出</div>,
  },
];
export default function HomeHeader() {
  return (
    <div className={styles["home-header"]}>
      {/* logo */}
      <span className={styles["home-header-logo"]}>
        <i
          className={classNames("iconfont icon-react", styles["icon-react"])}
        ></i>
        <i
          className={classNames(
            "iconfont icon-icon-test",
            styles["icon-icon-test"]
          )}
        ></i>
        <i
          className={classNames(
            "iconfont icon-typescript",
            styles["icon-typescript"]
          )}
        ></i>
      </span>
      {/* name */}
      <span className={styles["home-header-title"]}>在线系统</span>
      {/* Dropdown下拉菜单1 Bell */}
      <Dropdown menu={{ items: items1 }} arrow placement="bottom">
        {/* Badge 徽标数 */}
        <Badge dot>
          <BellOutlined style={{ fontSize: 20 }} />
        </Badge>
      </Dropdown>
      {/* Dropdown下拉菜单2  Avatar头像*/}
      <Dropdown menu={{ items: items2 }} arrow placement="bottom">
        {/* space 间距包住 */}
        <Space className={styles["home-header-space"]}>
          {/* Avatar头像 */}
          <Avatar size="large" icon={<AntDesignOutlined />} /> 用户
        </Space>
      </Dropdown>
    </div>
  );
}

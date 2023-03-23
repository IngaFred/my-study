import React, { useState } from "react";
import styles from "./Sign.module.scss";
import { Button, Calendar, Descriptions, Row, Select, Space, Tag } from "antd";
// 国际化配置
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";

const date = new Date();
const month = date.getMonth();
// 使用 React 的 useState Hook 来创建一个名为 month 的状态变量和一个名为 setMonth 的更新函数。
// const [month, setMonth] = useState(date.getMonth())
export default function Sign() {
  return (
    <div>
      {/* Descriptions描述列表 */}
      <Descriptions
        className={styles.descriptions}
        layout="vertical"
        column={9}
        bordered
      >
        <Descriptions.Item label="月份">{month + 1}月</Descriptions.Item>
        <Descriptions.Item label="正常出勤">0</Descriptions.Item>
        <Descriptions.Item label="旷工">0</Descriptions.Item>
        <Descriptions.Item label="遗漏打卡">0</Descriptions.Item>
        <Descriptions.Item label="迟到">0</Descriptions.Item>
        <Descriptions.Item label="早退">0</Descriptions.Item>
        <Descriptions.Item label="迟到并早退">0</Descriptions.Item>
        <Descriptions.Item label="操作">
          <Button size="small" ghost type="primary">
            查看详情
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label="考勤状态">
          <Tag color={"success"}>正常</Tag>
        </Descriptions.Item>
      </Descriptions>
      {/* Calendar自定义头部日历 */}
      <Calendar
        locale={locale}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const monthOptions = [];
          for (let i = 0; i < 12; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i}>
                {i + 1}月
              </Select.Option>
            );
          }

          return (
            <Row className={styles["calendar-Row"]} justify={"space-between"}>
              <Button type="primary">在线签到</Button>
              <Space>
                <Button>{value.year()}年</Button>
                {/* Select选择器 */}
                <Select value={month}>{monthOptions}</Select>
              </Space>
            </Row>
          );
        }}
      />
    </div>
  );
}

import React, { useState } from "react";
import styles from "./Sign.module.scss";
import { Button, Calendar, Descriptions, Row, Select, Space, Tag } from "antd";
// 国际化配置
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
// 跳转
import { useNavigate } from "react-router-dom";

const date = new Date();
// const month = date.getMonth();
enum DetailKey {
  normal = "正常出勤",
  absent = "旷工",
  miss = "遗漏打卡",
  late = "迟到",
  early = "早退",
  lateAndEarly = "迟到并早退",
}
// keyof typeof 获取一个对象或枚举类型的所有键
type DetailKeyKeys = keyof typeof DetailKey;
// 将deatailValue与DetailKey 关联Record<类型，值>
const deatailValues: Record<DetailKeyKeys, number> = {
  normal: 0,
  absent: 0,
  miss: 0,
  late: 0,
  early: 0,
  lateAndEarly: 0,
};
// 封装Tag
const detailState = {
  type: ("success" as "success") || "error",
  text: ("正常" as "正常") || "异常",
};

export default function Sign() {
  // 使用 React 的 useState Hook 来创建一个名为 month 的状态变量和一个名为 setMonth 的更新函数。
  const [month, setMonth] = useState(date.getMonth());
  const navigate = useNavigate();
  const handeleBut = () => {
    navigate("/exception");
  };
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
        {
          // 对象不可以被遍历 要将const对象转换为数组
          Object.entries(DetailKey).map((v) => (
            <Descriptions.Item key={v[0]} label={v[1]}>
              {deatailValues[v[0] as DetailKeyKeys]}
            </Descriptions.Item>
          ))
        }

        <Descriptions.Item label="操作">
          <Button size="small" ghost type="primary" onClick={handeleBut}>
            查看详情
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label="考勤状态">
          <Tag color={detailState.type}>{detailState.text}</Tag>
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
                <Select
                  value={month}
                  // 实时更改
                  onChange={(newMonth) => {
                    const now = value.clone().month(newMonth);
                    setMonth(newMonth);
                    onChange(now);
                  }}
                >
                  {monthOptions}
                </Select>
              </Space>
            </Row>
          );
        }}
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./Sign.module.scss";
import {
  Button,
  Calendar,
  Descriptions,
  message,
  Row,
  Select,
  Space,
  Tag,
} from "antd";
// 国际化配置
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
// 跳转
import { useNavigate } from "react-router-dom";
// lodash
import _ from "lodash";
// 对后台接口操作
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useAppDispatch } from "../../store";
import {
  getSignsAction,
  putSignsAction,
  updateInfos,
} from "../../store/modules/sign";
import type { Infos } from "../../store/modules/sign";
// Calendar 部分 locale 是从 value 中读取，所以请先正确设置 dayjs 的 locale
import type { Dayjs } from "dayjs";
// 字符补0
import { toZero } from "../../utils/common";

const date = new Date();
// const month = date.getMonth();
enum originDetailKey {
  normal = "正常出勤",
  absent = "旷工",
  miss = "遗漏打卡",
  late = "迟到",
  early = "早退",
  lateAndEarly = "迟到并早退",
}
// keyof typeof 获取一个对象或枚举类型的所有键
type DetailKeyKeys = keyof typeof originDetailKey;
// 将detailValue与DetailKey 关联Record<类型，值>
const originDetailValues: Record<DetailKeyKeys, number> = {
  normal: 0,
  absent: 0,
  miss: 0,
  late: 0,
  early: 0,
  lateAndEarly: 0,
};
// 封装Tag
const originDetailState = {
  // type: ("success" as "success") || "error",
  // text: ("正常" as "正常") || "异常",
  type: "success" || "error",
  text: "正常" || "异常",
};

export default function Sign() {
  // 使用 React 的 useState Hook 来创建一个名为 month 的状态变量和一个名为 setMonth 的更新函数。
  const [month, setMonth] = useState(date.getMonth());
  const DetailKey = originDetailKey;
  const [detailValues, setDetailValues] = useState(originDetailValues);
  const [detailState, setDetailState] = useState(originDetailState);

  const navigate = useNavigate();
  const handleBut = () => {
    navigate("/exception");
  };

  // 获取state.signs.infos 如果有 则表示 已经拿到用户打卡信息详情
  const signsInfos = useSelector((state: RootState) => state.signs.infos);
  // 拿到请求参数
  const usersInfos = useSelector((state: RootState) => state.user.infos);
  const dispatch = useAppDispatch();

  // console.log(signsInfos);

  useEffect(() => {
    if (signsInfos.detail) {
      const detailMonth = (signsInfos.detail as { [index: string]: unknown })[
        toZero(month + 1)
      ] as { [index: string]: unknown };
      // 循环得到特点月中的每天的数据 控制对应增加
      for (let days in detailMonth) {
        switch (detailMonth[days]) {
          case DetailKey.normal:
            detailValues.normal++;
            break;
        }
        switch (detailMonth[days]) {
          case DetailKey.absent:
            detailValues.absent++;
            break;
        }
        switch (detailMonth[days]) {
          case DetailKey.miss:
            detailValues.miss++;
            break;
        }
        switch (detailMonth[days]) {
          case DetailKey.late:
            detailValues.late++;
            break;
        }
        switch (detailMonth[days]) {
          case DetailKey.early:
            detailValues.early++;
            break;
        }
        switch (detailMonth[days]) {
          case DetailKey.lateAndEarly:
            detailValues.lateAndEarly++;
            break;
        }
      }
      setDetailValues(detailValues);

      // 考勤状态 Tag 异常
      for (let index in detailValues) {
        if (
          index !== "normal" &&
          detailValues[index as keyof typeof detailValues]
        ) {
          setDetailState({
            type: "error",
            text: "异常",
          });
        }
      }
    }
    // 更新前触发和销毁时触发
    return () => {
      // 重置detailValues
      for (let index in detailValues) {
        detailValues[index as keyof typeof detailValues] = 0;
      }
      // 重置detailState
      setDetailState({
        type: "success",
        text: "正常",
      });
    };
  }, [signsInfos, month, detailValues, DetailKey]);

  useEffect(() => {
    if (_.isEmpty(signsInfos)) {
      dispatch(getSignsAction({ userid: usersInfos._id as string })).then(
        (action) => {
          const { errcode, infos } = (
            action.payload as { [index: string]: unknown }
          ).data as { [index: string]: unknown };
          if (errcode === 0) {
            dispatch(updateInfos(infos as Infos));
          }
        }
      );
    }
    // 副作用函数依赖于 signsInfos、usersInfos 和 dispatch 这三个变量，添加到依赖项数组中
  }, [signsInfos, usersInfos, dispatch]);

  // 自定义渲染日期单元格，返回内容覆盖单元格
  // 获取signsInfos内time组
  // value.month+1 得到的是没有字符补0的 而数组中是字符补0的 引用utils/common.tsx 帮忙
  const dateCellRender = (value: Dayjs) => {
    const month =
      signsInfos.time &&
      (signsInfos.time as { [index: string]: unknown })[
        toZero(value.month() + 1)
      ];
    // 获得具体日期数组
    const date =
      month && (month as { [index: string]: unknown })[toZero(value.date())];
    // 数组转换为string
    let ret = "";
    if (Array.isArray(date)) {
      // join 数组连接
      ret = date.join(" - ");
    }
    return <div className={styles["calendar-Box"]}>{ret}</div>;
  };

  // 在线签到 更新用户打卡信息详情 put
  const handlePutSign = () => {
    dispatch(putSignsAction({ userid: usersInfos._id as string })).then(
      (action) => {
        const { errcode, infos } = (
          action.payload as { [index: string]: unknown }
        ).data as { [index: string]: unknown };
        // 正确拿到infos了
        if (errcode === 0) {
          dispatch(updateInfos(infos as Infos));
          message.success("签到成功");
        }
      }
    );
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
              {detailValues[v[0] as DetailKeyKeys]}
            </Descriptions.Item>
          ))
        }
        <Descriptions.Item label="操作">
          <Button size="small" ghost type="primary" onClick={handleBut}>
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
        dateCellRender={dateCellRender}
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
            <Row
              className={styles["calendar-Row"]}
              justify={"space-between"}
              align="middle"
            >
              <Button type="primary" onClick={handlePutSign}>
                在线签到
              </Button>
              <Space>
                <Button>{value.year()}年</Button>
                {/* Select选择器 */}
                <Select
                  // 实时更改
                  value={month}
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

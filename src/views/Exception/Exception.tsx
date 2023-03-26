import { Button, Col, Empty, Row, Select, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Exception.module.scss";

const date = new Date();

export default function Exception() {
  const navigate = useNavigate();
  const handleBtn = () => {
    navigate("/apply");
  };
  const [month, setMonth] = useState(date.getMonth());
  const monthOptions = [];
  for (let i = 0; i < 12; i++) {
    monthOptions.push(
      <Select.Option key={i} value={i}>
        {i + 1}月
      </Select.Option>
    );
  }
  return (
    <div className={styles.excetion}>
      <Row justify={"space-between"} align={"middle"}>
        <Button type="primary" onClick={handleBtn}>
          异常审核
        </Button>
        <Space>
          <Button>{date.getFullYear()}年</Button>
          <Select value={month}>{monthOptions}</Select>
        </Space>
      </Row>
      <Row>
        <Col span={12} className={styles["excetion-ColBox"]}>
          <Empty description="无异常考勤" />
        </Col>
        <Col span={12} className={styles["excetion-ColBox"]}>
          <Empty description="无审批申请" />
        </Col>
      </Row>
    </div>
  );
}

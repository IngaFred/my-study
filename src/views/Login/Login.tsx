import React from "react";
import styles from "./Login.module.scss";
// antd
import { Button, Form, Input, message, Row, Col } from "antd";
// token
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";
import { useAppDispatch } from "../../store";
// 引入登录接口
import {
  loginAction,
  updateInfos,
  updateToken,
} from "../../store/modules/user";
// 引入第三方模块 classnames
import classNames from "classnames";
// 引入编程式 路由跳转
import { useNavigate } from "react-router-dom";

export default function Login() {
  //编程式跳转
  const navigate = useNavigate();
  // 从useSelector中解出User中的token
  // const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useAppDispatch();

  // antd 方法
  const onFinish = (values: User) => {
    dispatch(loginAction(values)).then((action) => {
      // 对action.payload和其下的数据类型，进行断言
      const { errcode, token } = (
        action.payload as { [index: string]: unknown }
      ).data as { [index: string]: unknown };
      if (errcode === 0 && typeof token === "string") {
        //类型正确，且token更新成功
        dispatch(updateToken(token));
        message.success("登录成功");
        navigate("/");
      } else {
        message.error("登录失败");
      }
    });
  };
  // 已经知道errorInfo的类型，将它解出
  const onFinishFailed = ({ values }: { values: User }) => {
    message.error("登录失败");
    console.log("Failed:", values);
  };
  // form的表单对象拿到 使用Form.useForm() 然后绑定到已写form中 将对象绑定到组件
  const [form] = Form.useForm();
  // 编写登录测试用例
  interface User {
    email: string;
    pass: string;
  }
  const testUsers: User[] = [
    {
      email: "huangrong@imooc.com",
      pass: "huangrong",
    },
    {
      email: "hongqigong@imooc.com",
      pass: "hongqigong",
    },
  ];
  // 测试使用的自动登录 传参 高阶return
  const autoLogin = (values: User) => {
    return () => {
      // 设置表单数据的回显
      form.setFieldsValue(values);
      onFinish(values);
    };
  };
  return (
    <div>
      {/* 登录时查看token，和其持久化展示
      <br/>
      <Button onClick={ handlerLogin }>登录</Button>
      { token } */}
      <div className={styles.login}>
        <div className={styles.header}>
          <span className={styles["header-logo"]}>
            <i
              className={classNames(
                "iconfont icon-react",
                styles["icon-react"]
              )}
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
          <span className={styles["header-title"]}>在线系统</span>
        </div>
        <div className={styles.desc}>React18 + TypeScript4</div>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles.main}
          // 将对象绑定到组件
          form={form}
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: "请输入邮箱！" },
              // 简单的邮箱校验
              { type: "email", message: "请输入正确的邮箱地址！" },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="pass"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className={styles["test-users"]}>
          <Row gutter={20}>
            {testUsers.map((v) => (
              <Col key={v.email} span={12} push={5}>
                <h3>
                  测试账号 {v.email.length - 18}:
                  <p>
                    <Button
                      onClick={autoLogin({ email: v.email, pass: v.pass })}
                    >
                      一键登录
                    </Button>
                  </p>
                </h3>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

import React, { Component } from "react";

type propType = {
    name: string;
};
type StateType = {
  name: string;
};
export default class WelcomeIIIIrcc extends Component<propType,StateType> {

  /**
   * react生命周期 构造函数
   */
   constructor(props: propType | Readonly<propType>) {
    super(props);
    this.state = {
      name: 'My First Component',
    };
    console.log(this)
  }
  
/*   state = {
    name: 'My First Component'
  };
  props = {
    name: 'propsName'
  } */

  /**
   * react生命周期 挂载前
   */
  //  componentWillMount() {
  //   console.log('Component will mount');
  // }
  /**
   * react生命周期 挂载后
   */
  // componentDidMount() {
  //   console.log('Component did mount');
  // }

  /**
   * react生命周期 更新前
   */
  // componentWillUpdate() {
  //   console.log('Component will update');
  // }

  /**
   * react生命周期 更新后
   */
  // componentDidUpdate() {
  //   console.log('Component did update');
  // }

  /**
   * react生命周期 卸载前
   */
  // componentWillUnmount() {
  //   console.log('Component will unmount');
  // }

  /**
   * react生命周期 卸载后 不存在
   */
  // componentDidUnmount() {
  //   console.log('Component did unmount');
  // }

  /**
   * react生命周期 主方法 渲染
   */
  render() {
    return <>
      <div>WelcomeIIIIrcc</div>

      <div>{this.props.name}</div>

      <div>{this.state.name}</div>

      <div onClick={()=>{
        this.setState({
          name: 'My First Component Update'
        })
      }}>
        Update
      </div>
    </>;
  }
}

/*
 * rcc 直接生成骨架react 组件
 * rfc 直接生成react function 骨架
 */

/* 
  脚手架默认添加了 eslint 代码规范 package中修改额外的需求rules
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  "rules": {
    其余代码规范添加
  }
}, */

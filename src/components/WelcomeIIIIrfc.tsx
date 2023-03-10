//import React from 'react'
//根据现jsx的新的转换机制，其引入将由编译器自动引入，所以React17以上可以不用再import React，但是17以下还是要引入

import './WelcomeIIIIrcc.scss'

export default function FunctionIIIrfc() {
  return (
    <div className="welcome">
      <div className="box1">WelcomeIIIIrfc 01</div>
      <hr />
      <div className="box2">WelcomeIIIIrfc 02</div>

    </div>
  )
}

/**
 * rcc 直接生成骨架react 组件
 * rfc 直接生成react function 骨架
 */
import React from 'react'
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import styles from "../Home.module.scss";
// 子类
type MenuItem = Required<MenuProps>['items'][number];
// 归纳items
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

const items: MenuProps['items'] = [
    // 1级
    getItem('Navigation One', '1', <MailOutlined />),
    getItem('Navigation Two', '2', <AppstoreOutlined />, [
        // 2级
        getItem('Option 1', '3'),
        getItem('Option 2', '4'),
                                    // 3级
        getItem('Submenu', '5', null, [getItem('Option 3.1', '6'), getItem('Option 3.2', '8')]),
      ]),
      // 分割线
      { type: 'divider' },
      getItem('Navigation Three', '9', <SettingOutlined />),
      getItem('Group', 'grp', null, [getItem('Option 5.1', '10'), getItem('Option 5.2', '11')], 'group'),
];

export default function HomeAside() {
  return (
    <Menu 
    // onClick={onClick}
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['5']}
    mode="inline"
    items={items}
    className={styles["home-aside"]}
  />
  )
}

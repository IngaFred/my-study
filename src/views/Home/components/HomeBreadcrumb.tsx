import React from 'react'
import { Breadcrumb } from 'antd';
import styles from "../Home.module.scss";

export default function HomeBreadcrumb() {
  return (
    /* Breadcrumb面包屑 */
    <Breadcrumb className={styles["home-breadcrumb"]}
    items={[
      {
        title: 'Home',
      },
      {
        title: 'Sgin',
      }
    ]}
  />
  )
}

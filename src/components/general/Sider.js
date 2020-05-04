import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardTwoTone,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

const { Sider } = Layout;

const customSider = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" onClick={null}>
          <Link to="/">
            <UserOutlined />
            <span>introducción</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2" onClick={null}>
          <Link to="/citybike">
            <span>
              <DashboardTwoTone /> <span>Dashboard citibyke </span>
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default customSider;

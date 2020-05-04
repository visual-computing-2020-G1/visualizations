import React from "react";
import "./styles/sider.css";
import Introduction from "./views/Introduction";
import Citybike from "./views/Citybike";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Sider from "./components/general/Sider";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const Routes = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const Toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout>
        <Sider collapsed={collapsed} />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: Toggle,
              }
            )}
          </Header>
          <Content
            style={{
              margin: "15px 16px",
              padding: 20,
              minHeight: 768,
            }}
          >
            <Switch>
              <Route exact path="/citybike" component={Citybike} />
              <Route exact path="/*" component={Introduction} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;

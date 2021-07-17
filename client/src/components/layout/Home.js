import React, { useState } from 'react';
import { Layout } from 'antd';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

import { Button, Tooltip } from 'antd';
import Sidebar from './Sidebar';
import Dashboard from '../Dashboard';

const { Header, Content } = Layout;

const Home = () => {
    const [collapsed, setcollapsed] = useState(false)

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sidebar collapsed={collapsed} />
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Tooltip title={collapsed ? "Expand" : "Collapse"}>
                        <Button onClick={() => { setcollapsed(!collapsed) }} type="default" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
                    </Tooltip>

                </Header>

                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Dashboard />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Home;


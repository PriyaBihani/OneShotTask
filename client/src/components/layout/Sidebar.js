import React from 'react'
import { Link } from 'react-router-dom'

import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    SwapOutlined,
    LockOutlined,
} from '@ant-design/icons';

import { Image } from 'antd';

const { Sider } = Layout;
const Sidebar = ({ collapsed }) => {
    return (
        <Sider style={{ textAlign: "center" }} trigger={null} collapsible collapsed={collapsed}>
            <Image
                style={{ margin: "10px auto" }}
                width={50}
                src="https://www.svgrepo.com/show/206845/school-college.svg"
            />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link to={'/'}>
                        Dashboard</Link>
                </Menu.Item>
                {/* <Menu.Item key="3" icon={<LockOutlined />}>
                    Admin
                </Menu.Item> */}
            </Menu>
        </Sider>
    );
}

export default Sidebar;